import { useEffect, useRef, useState } from "react";
import socket from "../socket/socket";

import {
  Send,
  Image,
  Mic,
  Smile,
  CheckCheck,
} from "lucide-react";

import EmojiPicker from "emoji-picker-react";

export default function Chat() {

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [typing, setTyping] =
    useState(false);

  const [online, setOnline] =
    useState(true);

  const [showEmoji, setShowEmoji] =
    useState(false);

  const [unread, setUnread] =
    useState(0);

  const [lastSeen, setLastSeen] =
    useState("");

  const messagesEndRef = useRef(null);

  const chatId = "123";

  // AUTO SCROLL
  const scrollToBottom = () => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  };

  useEffect(() => {

    scrollToBottom();

  }, [messages]);

  // SOCKET
  useEffect(() => {

    socket.emit("join_chat", chatId);

    // ONLINE
    socket.on("user_online", () => {
      setOnline(true);
    });

    // LAST ACTIVE
    socket.on("last_seen", (time) => {
      setLastSeen(time);
      setOnline(false);
    });

    // RECEIVE MESSAGE
    socket.on(
      "receive_message",
      (data) => {

        setMessages((prev) => [
          ...prev,
          data,
        ]);

        // SOUND
        const audio = new Audio(
          "/notification.mp3"
        );

        audio.play();

        // UNREAD
        setUnread((prev) => prev + 1);

      }
    );

    // TYPING
    socket.on("typing", () => {

      setTyping(true);

      setTimeout(() => {
        setTyping(false);
      }, 1500);

    });

    return () => {

      socket.off("receive_message");

    };

  }, []);

  // SEND MESSAGE
  const sendMessage = () => {

    if (!message.trim()) return;

    const data = {
      chatId,
      text: message,
      sender: "me",
      seen: false,
      createdAt: new Date(),
    };

    socket.emit(
      "send_message",
      data
    );

    setMessages((prev) => [
      ...prev,
      data,
    ]);

    setMessage("");

    setShowEmoji(false);

  };

  // TYPING EVENT
  const handleTyping = (e) => {

    setMessage(e.target.value);

    socket.emit("typing", chatId);

  };

  // IMAGE SEND
  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const imageUrl =
      URL.createObjectURL(file);

    const data = {
      chatId,
      image: imageUrl,
      sender: "me",
    };

    socket.emit(
      "send_message",
      data
    );

    setMessages((prev) => [
      ...prev,
      data,
    ]);

  };

  // VOICE NOTE
  const sendVoice = () => {

    alert(
      "Voice Recording Feature Added"
    );

  };

  return (
    <div
      className="
        h-screen
        bg-gradient-to-r
        from-[#081c3a]
        to-[#0b3c78]
        flex
        justify-center
        items-center
        p-3
      "
    >

      {/* CHAT BOX */}
      <div
        className="
          w-full
          max-w-3xl
          h-[95vh]
          bg-white/10
          backdrop-blur-lg
          border
          border-white/20
          rounded-3xl
          flex
          flex-col
          overflow-hidden
        "
      >

        {/* HEADER */}
        <div
          className="
            p-4
            border-b
            border-white/20
            flex
            items-center
            justify-between
          "
        >

          <div className="flex items-center gap-3">

            <img
              src="https://i.pravatar.cc/100"
              className="
                w-12
                h-12
                rounded-full
                object-cover
              "
            />

            <div>

              <h2
                className="
                  text-white
                  font-bold
                  text-lg
                "
              >
                Provider Chat
              </h2>

              {online ? (

                <p
                  className="
                    text-green-400
                    text-sm
                  "
                >
                  ● Online
                </p>

              ) : (

                <p
                  className="
                    text-gray-300
                    text-sm
                  "
                >
                  Last active {lastSeen}
                </p>

              )}

            </div>

          </div>

          {/* UNREAD */}
          {unread > 0 && (
            <div
              className="
                bg-red-500
                text-white
                px-3
                py-1
                rounded-full
                text-sm
              "
            >
              {unread}
            </div>
          )}

        </div>

        {/* MESSAGES */}
        <div
          className="
            flex-1
            overflow-y-auto
            p-4
            space-y-4
          "
        >

          {messages.map((m, i) => (

            <div
              key={i}
              className={`
                flex
                ${
                  m.sender === "me"
                    ? "justify-end"
                    : "justify-start"
                }
              `}
            >

              <div
                className={`
                  max-w-[75%]
                  rounded-2xl
                  px-4
                  py-3
                  shadow-lg
                  ${
                    m.sender === "me"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                  }
                `}
              >

                {/* IMAGE */}
                {m.image && (
                  <img
                    src={m.image}
                    className="
                      rounded-xl
                      mb-2
                      max-h-60
                    "
                  />
                )}

                {/* TEXT */}
                {m.text && (
                  <p>{m.text}</p>
                )}

                {/* TIME */}
                <div
                  className="
                    flex
                    items-center
                    justify-end
                    gap-1
                    text-xs
                    mt-2
                    opacity-70
                  "
                >

                  {new Date(
                    m.createdAt
                  ).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}

                  {m.sender === "me" && (
                    <CheckCheck size={14} />
                  )}

                </div>

              </div>

            </div>
          ))}

          {/* TYPING */}
          {typing && (
            <p className="text-white">
              ✅ Typing...
            </p>
          )}

          <div ref={messagesEndRef} />

        </div>

        {/* EMOJI */}
        {showEmoji && (
          <div className="absolute bottom-24 left-5 z-50">
            <EmojiPicker
              onEmojiClick={(e) =>
                setMessage(
                  (prev) + e.emoji
                )
              }
            />
          </div>
        )}

        {/* INPUT */}
        <div
          className="
            border-t
            border-white/20
            p-4
            flex
            items-center
            gap-3
          "
        >

          {/* EMOJI */}
          <button
            onClick={() =>
              setShowEmoji(!showEmoji)
            }
            className="text-white"
          >
            <Smile />
          </button>

          {/* IMAGE */}
          <label className="cursor-pointer text-white">

            <Image />

            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImage}
            />

          </label>

          {/* VOICE */}
          <button
            onClick={sendVoice}
            className="text-white"
          >
            <Mic />
          </button>

          {/* INPUT */}
          <input
            type="text"
            value={message}
            onChange={handleTyping}
            placeholder="Type message..."
            className="
              flex-1
              bg-white/10
              border
              border-white/20
              rounded-2xl
              px-4
              py-3
              text-white
              placeholder-gray-300
              outline-none
            "
          />

          {/* SEND */}
          <button
            onClick={sendMessage}
            className="
              bg-blue-500
              hover:bg-blue-600
              p-3
              rounded-2xl
              text-white
              transition
            "
          >
            <Send />
          </button>

        </div>

      </div>

    </div>
  );
}