import { useNavigate } from "react-router-dom";
import { User, LogOut, Wrench, Zap, Hammer, Paintbrush, Brush, Snowflake } from "lucide-react";
import Loader from "../../components/Loader";
import { useState } from "react";


export default function CustomerServices() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const services = [
    {
      name: "Plumber",
      icon: <Wrench className="text-purple-400 w-10 h-10" />,
      desc: "Water leakage, pipe fitting, bathroom & kitchen repair."
    },
    {
      name: "Electrician",
      icon: <Zap className="text-yellow-400 w-10 h-10" />,
      desc: "Wiring, switches, lights and maintenance."
    },
    {
      name: "Carpenter",
      icon: <Hammer className="text-gray-400 w-10 h-10" />,
      desc: "Furniture repair and wood work."
    },
    {
      name: "Painter",
      icon: <Paintbrush className="text-pink-400 w-10 h-10" />,
      desc: "Interior & exterior painting."
    },
    {
      name: "Cleaner",
      icon: <Brush className="text-orange-400 w-10 h-10" />,
      desc: "Home & office cleaning services."
    },
    {
      name: "AC Technician",
      icon: <Snowflake className="text-blue-400 w-10 h-10" />,
      desc: "AC repair, gas refill & installation."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#081c3a] to-[#0b3c78]">
       {loading && <Loader/>}

      <div className="text-center py-10 text-white">
        <h2 className="text-3xl font-bold">Our Services</h2>
        <p className="text-gray-300 mt-2">
          Reliable local services at your fingertips
        </p>
      </div>

      <div className="px-6 pb-10 grid sm:grid-cols-2 md:grid-cols-3 gap-9 max-w-5xl mx-auto">

        {services.map((s, i) => (
          <div
            key={i}
            className="
              bg-white/10 
              backdrop-blur-md 
              border border-white/20 
              p-6 
              rounded-2xl 
              text-center 
              shadow-lg 
              hover:scale-105 
              transition
            "
          >
            {/* ICON */}
            <div className="flex justify-center mb-4">
              {s.icon}
            </div>

            <h2 className="text-lg font-semibold text-white mb-2">
              {s.name}
            </h2>

            {/* DESC */}
            <p className="text-sm text-gray-300 mb-4">
              {s.desc}
            </p>

            {/* BUTTON */}
            <button
              onClick={() => navigate(`/customer/service/${s.name.toLowerCase()}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Book Now
            </button>
          </div>
        ))}

      </div>

    </div>
  );
}