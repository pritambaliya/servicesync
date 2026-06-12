export default function Loader() {
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-[99999]">
      <div className="bg-white/80 backdrop-blur-lg px-8 py-6 rounded-2xl shadow-xl flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-[5px] border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-gray-800 font-semibold text-lg">
          Please wait...
        </span>
      </div>
    </div>
  );
}