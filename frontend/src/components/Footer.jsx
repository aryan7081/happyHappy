import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-10">
        {/* Branding */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-violet-400">CoreFit</h1>
          <p className="text-sm text-gray-400 mt-2 max-w-xs">
            Empowering your fitness journey — one rep at a time.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold mb-1">Quick Links</h3>
          <a href="/" className="text-sm text-gray-400 hover:text-white transition">Home</a>
          <a href="/about" className="text-sm text-gray-400 hover:text-white transition">About</a>
          <a href="/classes" className="text-sm text-gray-400 hover:text-white transition">Classes</a>
          <a href="/contact" className="text-sm text-gray-400 hover:text-white transition">Contact</a>
        </div>

        {/* Social */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold mb-1">Connect With Us</h3>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-violet-400 transition">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="hover:text-violet-400 transition">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="hover:text-violet-400 transition">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="hover:text-violet-400 transition">
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center py-4 border-t border-gray-700 text-sm text-gray-500">
        © {new Date().getFullYear()} CoreFit. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
