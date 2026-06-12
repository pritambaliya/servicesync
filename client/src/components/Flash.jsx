import { X } from "lucide-react";

export default function Flash({ flash, setFlash, success = true }) {
  if (flash.type === "success" && !success) {
    return null;
  }

  return (
    <div
      className={`fixed top-5 right-5 px-5 py-3 rounded-xl flex items-center gap-3 shadow-2xl z-[9999] animate-bounce text-white backdrop-blur-md border
        ${flash.type === "success"
          ? "bg-green-500/90 border-green-300"
          : "bg-red-500/90 border-red-300"
        }
      `}
    >
      <span className="font-medium">
        {flash.message}
      </span>

      <X
        size={18}
        className="cursor-pointer hover:opacity-70"
        onClick={() =>
          setFlash({ type: "", message: "" })
        }
      />
    </div>
  );
}