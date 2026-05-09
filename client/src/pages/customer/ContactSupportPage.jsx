import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaHeadset,
  FaQuestionCircle,
  FaTools,
  FaShieldAlt,
} from "react-icons/fa";

export default function ContactSupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#081c3a] to-[#0b3c78] text-white px-6 py-16">

      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center mb-16">

        <h1 className="text-5xl font-bold mb-5">
          Contact & Support
        </h1>

        <p className="text-gray-300 text-lg leading-8">
          Need help with booking services, payments,
          providers or technical issues?
          Our support team is always ready to assist you.
        </p>

      </div>

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 mb-16">

        {/* CONTACT INFO */}
        <div className="bg-white/10 border border-white/20 rounded-3xl p-8 backdrop-blur-md shadow-2xl">

          <h2 className="text-3xl font-bold mb-8">
            Get In Touch
          </h2>

          <div className="space-y-6">

            <div className="flex gap-4 items-start">

              <div className="bg-yellow-400 text-black p-4 rounded-2xl">
                <FaPhoneAlt />
              </div>

              <div>
                <h3 className="font-semibold text-xl">
                  Phone Support
                </h3>

                <p className="text-gray-300 mt-1">
                  +91 98765 43210
                </p>
              </div>

            </div>

            <div className="flex gap-4 items-start">

              <div className="bg-yellow-400 text-black p-4 rounded-2xl">
                <FaEnvelope />
              </div>

              <div>
                <h3 className="font-semibold text-xl">
                  Email Address
                </h3>

                <p className="text-gray-300 mt-1">
                  support@servicesync.com
                </p>
              </div>

            </div>

            <div className="flex gap-4 items-start">

              <div className="bg-yellow-400 text-black p-4 rounded-2xl">
                <FaMapMarkerAlt />
              </div>

              <div>
                <h3 className="font-semibold text-xl">
                  Office Location
                </h3>

                <p className="text-gray-300 mt-1 leading-7">
                  Rajkot, Gujarat, India
                </p>
              </div>

            </div>

            <div className="flex gap-4 items-start">

              <div className="bg-yellow-400 text-black p-4 rounded-2xl">
                <FaClock />
              </div>

              <div>
                <h3 className="font-semibold text-xl">
                  Working Hours
                </h3>

                <p className="text-gray-300 mt-1">
                  Mon - Sat : 9:00 AM - 8:00 PM
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="bg-white/10 border border-white/20 rounded-3xl p-8 backdrop-blur-md shadow-2xl">

          <h2 className="text-3xl font-bold mb-8">
            Send Message
          </h2>

          <form className="space-y-5">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 outline-none placeholder-gray-300"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 outline-none placeholder-gray-300"
            />

            <input
              type="text"
              placeholder="Subject"
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 outline-none placeholder-gray-300"
            />

            <textarea
              rows="6"
              placeholder="Write your message..."
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 outline-none placeholder-gray-300 resize-none"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-2xl transition"
            >
              Send Message
            </button>

          </form>
        </div>
      </div>

      {/* SUPPORT CARDS */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">

        <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-md hover:scale-105 transition">

          <div className="bg-yellow-400 text-black w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-5">
            <FaHeadset />
          </div>

          <h3 className="text-2xl font-bold mb-3">
            24/7 Support
          </h3>

          <p className="text-gray-300 leading-7">
            Contact our support team anytime for instant assistance.
          </p>

        </div>

        <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-md hover:scale-105 transition">

          <div className="bg-yellow-400 text-black w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-5">
            <FaQuestionCircle />
          </div>

          <h3 className="text-2xl font-bold mb-3">
            FAQs
          </h3>

          <p className="text-gray-300 leading-7">
            Find quick answers for common questions.
          </p>

        </div>

        <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-md hover:scale-105 transition">

          <div className="bg-yellow-400 text-black w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-5">
            <FaTools />
          </div>

          <h3 className="text-2xl font-bold mb-3">
            Technical Help
          </h3>

          <p className="text-gray-300 leading-7">
            Facing booking or payment issues? We can help.
          </p>

        </div>

        <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-md hover:scale-105 transition">

          <div className="bg-yellow-400 text-black w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-5">
            <FaShieldAlt />
          </div>

          <h3 className="text-2xl font-bold mb-3">
            Safety & Security
          </h3>

          <p className="text-gray-300 leading-7">
            Your privacy and data are always protected.
          </p>

        </div>

      </div>

      {/* FAQ */}
      <div className="max-w-5xl mx-auto bg-white/10 border border-white/20 rounded-3xl p-8 backdrop-blur-md">

        <h2 className="text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">

          <div className="bg-white/10 rounded-2xl p-5">
            <h3 className="font-semibold text-xl mb-2">
              How can I book a service?
            </h3>

            <p className="text-gray-300 leading-7">
              Open provider profile and click the Book Now button.
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-5">
            <h3 className="font-semibold text-xl mb-2">
              Are providers verified?
            </h3>

            <p className="text-gray-300 leading-7">
              Yes, every provider is verified by admin before approval.
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-5">
            <h3 className="font-semibold text-xl mb-2">
              How do I contact support?
            </h3>

            <p className="text-gray-300 leading-7">
              Use the contact form or email support@servicesync.com.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
