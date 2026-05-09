import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  localStorage.clear();
  return (
    <div className="bg-gray-100">

      {/* HERO */}
      <div className="bg-gradient-to-r from-[#081c3a] to-[#0b3c78] text-white py-20 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          About ServiceSync
        </h1>

        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
          We connect customers with trusted local service providers quickly and easily.
        </p>
      </div>

      {/* ABOUT SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

        {/* IMAGE */}
        <img
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952"
          alt="about"
          className="w-full h-[300px] object-cover rounded-xl shadow-md"
        />

        {/* TEXT */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#081c3a]">
            Who We Are
          </h2>

          <p className="text-gray-600 mb-4 text-[16px] leading-relaxed">
            ServiceSync is a modern platform designed to connect customers with skilled service providers like plumbers, electricians, carpenters, and more.
          </p>

          <p className="text-gray-600 mb-4 text-[16px] leading-relaxed">
            Our mission is to make finding reliable services fast, easy, and secure for everyone.
          </p>

          <p className="text-gray-600 text-[16px] leading-relaxed">
            We ensure verified providers and a smooth booking experience for users across different services.
          </p>
        </div>
      </div>

      {/* FEATURES */}
      <div className="bg-white py-16 px-6">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-12 text-[#081c3a]">
          Why Choose Us
        </h2>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8">

          <div className="bg-gray-100 p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">✔ Verified Providers</h3>
            <p className="text-gray-600 text-sm">
              All providers are verified and trusted for your safety.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">⚡ Fast Booking</h3>
            <p className="text-gray-600 text-sm">
              Book services instantly with just a few clicks.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">💰 Affordable Pricing</h3>
            <p className="text-gray-600 text-sm">
              Transparent and reasonable pricing for all services.
            </p>
          </div>

        </div>
      </div>

      {/* EXTRA IMAGE SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

        {/* TEXT */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#081c3a]">
            Our Vision
          </h2>

          <p className="text-gray-600 text-[16px] leading-relaxed">
            Our vision is to become the most trusted service platform where users can easily find professionals for their daily needs with confidence and convenience.
          </p>
        </div>

        {/* IMAGE */}
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="vision"
          className="w-full h-[300px] object-cover rounded-xl shadow-md"
        />
      </div>

      {/* CTA */}
      <div className="bg-[#081c3a] text-white text-center py-14 px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to get started?
        </h2>

        <p className="mb-6 text-blue-200">
          Join ServiceSync and book trusted services today.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded shadow-md"
        >
          Get Started
        </button>
      </div>

    </div>
  );
}