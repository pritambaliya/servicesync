export default function Header() {
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between">

      <h1 className="text-lg font-semibold">Admin Dashboard</h1>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
        className="text-red-500"
      >
        Logout
      </button>

    </div>
  );
}