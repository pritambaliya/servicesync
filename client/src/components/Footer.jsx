import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="bg-gradient-to-r from-[#081c3a] to-[#0b3c78] text-white">
        <div className="w-full h-[1px] bg-white/20"></div>
        <div
          className=" max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10"
        >

          <div>

            <h2 className="text-3xl font-bold mb-4">
              ServiceSync
            </h2>

            <p className="text-gray-300 leading-7 text-sm">
              Connecting customers with trusted local
              service providers for home repair,
              maintenance, furniture work, plumbing,
              electrical services and more.
            </p>

            <div className="flex items-center gap-4 mt-6">

              <a
                href="#"
                className=" w-10 h-10 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-black flex items-center justify-center transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className=" w-10 h-10 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-black flex items-center justify-center transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className=" w-10 h-10 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-black flex items-center justify-center transition"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className=" w-10 h-10 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-black flex items-center justify-center transition"
              >
                <FaLinkedinIn />
              </a>

            </div>
          </div>

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-300">

              <li>
                <Link
                  to="/"
                  className="hover:text-yellow-400 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="hover:text-yellow-400 transition"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/customer"
                  className="hover:text-yellow-400 transition"
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  className="hover:text-yellow-400 transition"
                >
                  Reviews
                </Link>
              </li>

              <li>
                <Link
                  to="/contactsupport"
                  className="hover:text-yellow-400 transition"
                >
                  Contact
                </Link>
              </li>

            </ul>
          </div>

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Popular Services
            </h3>

            <ul className="space-y-3 text-gray-300">

              <li className="hover:text-yellow-400 transition cursor-pointer">
                Plumbing Services
              </li>

              <li className="hover:text-yellow-400 transition cursor-pointer">
                Electrical Repair
              </li>

              <li className="hover:text-yellow-400 transition cursor-pointer">
                AC Technician
              </li>

              <li className="hover:text-yellow-400 transition cursor-pointer">
                Furniture Repair
              </li>

              <li className="hover:text-yellow-400 transition cursor-pointer">
                Home Cleaning
              </li>

            </ul>
          </div>

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Contact Info
            </h3>

            <div className="space-y-4 text-gray-300">

              <div className="flex items-start gap-3">

                <FaMapMarkerAlt className="mt-1 text-yellow-400" />

                <p>
                  Bhavnagar, Gujarat, India
                </p>

              </div>

              <div className="flex items-center gap-3">

                <FaPhoneAlt className="text-yellow-400" />

                <p>+91 98765 43210</p>

              </div>

              <div className="flex items-center gap-3">

                <FaEnvelope className="text-yellow-400" />

                <p>
                  support@servicesync.com
                </p>

              </div>

            </div>

            <div className="mt-6">

              <p className="text-sm text-gray-300 mb-3">
                Subscribe for latest updates
              </p>

              <div className="flex">

                <input
                  type="email"
                  placeholder="Your Email"
                  className=" w-full px-4 py-3 rounded-l-xl bg-white/10 border border-white/20 outline-none text-white placeholder-gray-300"
                />

                <button
                  className="
                    bg-yellow-400
                    hover:bg-yellow-500
                    text-black
                    px-5
                    rounded-r-xl
                    font-semibold
                    transition
                  "
                >
                  Join
                </button>

              </div>

            </div>

          </div>
        </div>

        {/* bottom */}
        <div
          className=" border-t border-white/10 py-5 px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-300 max-w-7xl mx-auto
          "
        >

          <p>
            © 2026 ServiceSync. All rights reserved.
          </p>

          <div className="flex items-center gap-6 mt-3 md:mt-0">

            <Link

              className="hover:text-yellow-400 transition"
            >
              Privacy Policy
            </Link>

            <Link

              className="hover:text-yellow-400 transition"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/contactsupport"
              className="hover:text-yellow-400 transition"
            >
              Support
            </Link>

          </div>

        </div>
      </footer>
    </>
  );
}