import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Footer() {
  return (
    <footer className="w-full bg-white text-gray-700 py-10 px-5 border-t border-gray-200">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Campus Connect</h2>
          <p className="text-sm leading-6 text-gray-600">
            A unified platform that empowers students, faculty, and administration to collaborate
            and create a smarter digital campus ecosystem.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Links</h3>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            <li>
              <a href="/about" className="hover:text-blue-600 transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="/events" className="hover:text-blue-600 transition-colors">
                Events
              </a>
            </li>
            <li>
              <a href="/community" className="hover:text-blue-600 transition-colors">
                Community
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-600 transition-colors">
                Contact
              </a>
            </li>
            <li>
              <a href="/careers" className="hover:text-blue-600 transition-colors">
                Careers
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-blue-600 transition-colors">
                Privacy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-blue-600 transition-colors">
                Terms
              </a>
            </li>
            <li>
              <a href="/support" className="hover:text-blue-600 transition-colors">
                Support
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-blue-600 transition-colors">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Connect with Us</h3>
          <p className="text-sm text-gray-600 mb-3">Email: support@campusconnect.in</p>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-blue-600">
              <FaFacebook size={22} />
            </a>
            <a href="#" className="hover:text-pink-500">
              <FaInstagram size={22} />
            </a>
            <a href="#" className="hover:text-blue-700">
              <FaLinkedin size={22} />
            </a>
            <a href="mailto:support@campusconnect.in" className="hover:text-red-500">
              <MdEmail size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Campus Connect. All rights reserved.
      </div>
    </footer>
  );
}
