import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const services = [
    { name: "Plumber", icon: "🔧" },
    { name: "Electrician", icon: "⚡" },
    { name: "Carpenter", icon: "🪚" },
    { name: "Cleaner", icon: "🧹" },
    { name: "Painter", icon: "🎨" },
    { name: "AC Technician", icon: "❄️" },
    { name: "Gardener", icon: "🌿" },
    { name: "Pet Care", icon: "🐶" },
  ];

  return (
    <div className="bg-gray-200 min-h-screen">

      <div className="bg-gradient-to-r from-[#081c3a] to-[#0b3c78] text-white py-20 text-center text-white text-center py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find Trusted Services Near You
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-6">
          Reliable home services, just one click away
        </p>

        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md text-white font-medium shadow-md transition"
        >
          Get Started 
        </button>
      </div>

      <div className="py-14 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Our Services
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-9">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-xl shadow-md p-6 flex items-center gap-3 
                         hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
            >
              <span className="text-2xl">{service.icon}</span>
              <p className="text-lg text-gray-700">
                {service.name}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}