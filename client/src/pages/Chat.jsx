import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket/socket";

import { Send, Image, Mic, Smile, CheckCheck } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

export default function Chat() {
  const { bookingId } = useParams();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [online, setOnline] = useState(true);
  const [showEmoji, setShowEmoji] = useState(false);
  const [lastSeen, setLastSeen] = useState("");

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  const otherUser = useMemo(() => {
    if (!chat) return null;
    return role === "customer" ? chat.provider : chat.customer;
  }, [chat, role]);

  // WhatsApp-style Smart Scroll
  const scrollToBottom = useCallback((force = false) => {
    if (!chatContainerRef.current) return;
    const container = chatContainerRef.current;
    const scrollPosition = container.scrollTop + container.clientHeight;
    const scrollHeight = container.scrollHeight;
    const isNearBottom = scrollHeight - scrollPosition < 150;

    if (force || isNearBottom) {
      container.scrollTo({
        top: scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    setTimeout(() => scrollToBottom(true), 300);
  }, [chat?._id, scrollToBottom]);

  // Fetch Chat
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await fetch(`http://localhost:5000/chat/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });
        const data = await res.json();

        if (data.success && data.data) {
          setChat(data.data);
          setMessages(data.data.messages || []);
        }
      } catch (err) {
        console.error("Failed to fetch chat:", err);
      }
    };

    if (bookingId && token) fetchChat();
  }, [bookingId, token]);

  // Socket Setup
  useEffect(() => {
    if (!chat?._id) return;

    socket.emit("join_chat", chat._id);

    const handlers = {
      user_online: () => setOnline(true),
      last_seen: (time) => {
        setLastSeen(time);
        setOnline(false);
      },
      receive_message: (msg) => {
         if (!msg?.text?.trim() && !msg?.image) return;

        setMessages((prev) => [...prev, { ...msg, seen: false }]);
        new Audio("/notification.mp3").play().catch(() => {});
      },
      message_seen: (msgId) => {
        setMessages((prev) =>
          prev.map((m) => (m._id === msgId ? { ...m, seen: true } : m))
        );
      },
      message_deleted: (msgId) => {
        setMessages((prev) => prev.filter((m) => m._id !== msgId));
      },
      typing: () => {
        setTyping(true);
        setTimeout(() => setTyping(false), 1500);
      },
    };

    Object.entries(handlers).forEach(([event, handler]) => socket.on(event, handler));

    return () => {
      Object.keys(handlers).forEach((event) => socket.off(event));
    };
  }, [chat?._id]);

  // ==================== SEND MESSAGE (OPTIMISTIC UPDATE) ====================
  const sendMessage = async () => {
    if (!message.trim() || !chat?._id) return;

    const tempMessage = {
      _id: `temp-${Date.now()}`,
      text: message,
      sender: user._id,
      createdAt: new Date().toISOString(),
      seen: false,
    };

    // Optimistic Update - Show message immediately
    setMessages((prev) => [...prev, tempMessage]);
    scrollToBottom(true);

    const currentMessage = message;
    setMessage("");

    try {
      const res = await fetch(`http://localhost:5000/chat/send/${chat._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ text: currentMessage }),
      });

      const result = await res.json();

      if (result.success && result.data) {
        // Replace temporary message with real one from server
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === tempMessage._id ? result.data : msg
          )
        );
        socket.emit("send_message", { chatId: chat._id, message: result.data });
      }
    } catch (err) {
      console.error(err);
      // Optional: Remove temp message on error
      // setMessages((prev) => prev.filter((m) => m._id !== tempMessage._id));
    }
  };

  // Send Image
  const handleImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !chat?._id) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`http://localhost:5000/chat/send-image/${chat._id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
        body: formData,
      });

      const result = await res.json();
      if (result.success && result.data) {
        setMessages((prev) => [...prev, result.data]);
        socket.emit("send_message", { chatId: chat._id, message: result.data });
        scrollToBottom(true);
      }
    } catch (err) {
      console.error("Image upload failed:", err);
    }

    e.target.value = "";
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    if (chat?._id) socket.emit("typing", chat._id);
  };

  // Context Menu - Improved Position
  const openMenu = (e, msg) => {
    e.preventDefault();

    let x = e.pageX || (e.touches && e.touches[0]?.clientX) || 100;
    let y = e.pageY || (e.touches && e.touches[0]?.clientY) || 100;

    // Prevent menu from going off-screen
    const menuWidth = 180;
    const menuHeight = 120;
    if (x + menuWidth > window.innerWidth) x = window.innerWidth - menuWidth - 10;
    if (y + menuHeight > window.innerHeight) y = window.innerHeight - menuHeight - 10;

    setSelectedMessage(msg);
    setMenuPosition({ x, y });
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
    setSelectedMessage(null);
  };

  const deleteForMe = () => {
    if (!selectedMessage?._id) return;
    setMessages((prev) => prev.filter((m) => m._id !== selectedMessage._id));
    closeMenu();
  };

  const deleteForEveryone = async () => {
    if (!selectedMessage?._id) return;

    try {
      const res = await fetch(`http://localhost:5000/chat/delete/${selectedMessage._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        setMessages((prev) => prev.filter((m) => m._id !== selectedMessage._id));
        socket.emit("message_deleted", selectedMessage._id);
      }
    } catch (err) {
      console.error(err);
    }
    closeMenu();
  };

  useEffect(() => {
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  return (
    <div className="h-screen bg-gradient-to-r from-[#081c3a] to-[#0b3c78] flex justify-center items-center p-3">
      <div className="w-full max-w-3xl h-[95vh] bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl flex flex-col overflow-hidden">
        
        {/* HEADER */}
        <div className="p-4 border-b border-white/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={otherUser?.profileImage?.url || "https://i.pravatar.cc/100"}
              className="w-12 h-12 rounded-full object-cover"
              alt="profile"
            />
            <div>
              <h2 className="text-white font-bold text-lg">
                {otherUser?.name || "Loading..."}
              </h2>
              <p className="text-white/70 text-sm">
                {online ? "Online" : lastSeen ? `Last seen ${lastSeen}` : ""}
              </p>
            </div>
          </div>
        </div>

        {/* MESSAGES */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent"
        >
          {messages.map((m) => {
           
            const isMine = String(m.sender) === String(user._id);

            return (
              <div
                key={m._id}
                onContextMenu={(e) => openMenu(e, m)}
                onTouchStart={(e) => {
                  const timer = setTimeout(() => openMenu(e, m), 600);
                  e.currentTarget.dataset.timer = timer;
                }}
                onTouchEnd={(e) => clearTimeout(e.currentTarget.dataset.timer)}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 shadow-lg ${
                    isMine
                      ? "bg-blue-500 text-white rounded-2xl rounded-br-md"
                      : "bg-white text-black rounded-2xl rounded-bl-md"
                  }`}
                >
                  {m.image && (
                    <img
                      src={m.image}
                      alt="chat"
                      className="rounded-xl mb-2 max-h-60 object-contain"
                    />
                  )}
                  {m.text && <p className="whitespace-pre-wrap break-words">{m.text}</p>}

                  <div className="flex items-center justify-end gap-1 text-xs mt-1 opacity-75">
                    {m.createdAt &&
                      new Date(m.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    {isMine && (
                      <CheckCheck
                        size={14}
                        className={m.seen ? "text-green-300" : "text-gray-300"}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {typing && <p className="text-white/70 text-sm italic pl-4">Typing...</p>}
        </div>

        {/* EMOJI */}
        {showEmoji && (
          <div className="absolute bottom-24 left-6 z-50">
            <EmojiPicker
              onEmojiClick={(emoji) => setMessage((prev) => prev + emoji.emoji)}
            />
          </div>
        )}

        {/* INPUT */}
        <div className="border-t border-white/20 p-4 flex items-center gap-3">
          <button
            onClick={() => setShowEmoji(!showEmoji)}
            className="text-white p-2 hover:bg-white/10 rounded-xl transition"
          >
            <Smile size={24} />
          </button>

          <label className="cursor-pointer text-white p-2 hover:bg-white/10 rounded-xl transition">
            <Image size={24} />
            <input
              ref={fileInputRef}
              type="file"
              hidden
              accept="image/*"
              onChange={handleImage}
            />
          </label>

          <button
            onClick={() => alert("Voice note coming soon")}
            className="text-white p-2 hover:bg-white/10 rounded-xl transition"
          >
            <Mic size={24} />
          </button>

          <input
            type="text"
            value={message}
            onChange={handleTyping}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-gray-300 outline-none"
          />

          <button
            onClick={sendMessage}
            disabled={!message.trim()}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 p-3 rounded-2xl text-white transition"
          >
            <Send size={22} />
          </button>
        </div>
      </div>

      {/* CONTEXT MENU - Fixed Positioning */}
      {showMenu && selectedMessage && (
        <div
          className="fixed bg-white rounded-xl shadow-2xl overflow-hidden z-50 min-w-[180px] py-1"
          style={{
            top: `${menuPosition.y}px`,
            left: `${menuPosition.x}px`,
          }}
        >
          <button
            onClick={deleteForMe}
            className="block w-full text-left px-4 py-3 hover:bg-gray-100"
          >
            Delete for me
          </button>
          {String(selectedMessage.sender) === String(user._id) && (
            <button
              onClick={() => {
                if (window.confirm("Delete for everyone?")) deleteForEveryone();
              }}
              className="block w-full text-left px-4 py-3 text-red-500 hover:bg-red-50"
            >
              Delete for everyone
            </button>
          )}
        </div>
      )}
    </div>
  );
} 