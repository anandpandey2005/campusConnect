import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaUserGraduate,
  FaBookOpen,
  FaBullhorn,
  FaShoppingBag,
  FaHandshake,
  FaRobot,
} from 'react-icons/fa';
``;
import { Footer } from '../components';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center">
      {/* ================= HERO SECTION ================= */}

      <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center text-center text-white overflow-hidden bg-linear-to-r from-indigo-800 via-purple-700 to-blue-700 border border-none rounded-b-xl sm:rounded-b-[10%] ">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/campusConnectHome.png')] bg-cover bg-center opacity-40"></div>
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-black/80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 animate-fadeInUp">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight drop-shadow-xl">
            <span className="text-yellow-400">Campus Connect</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-100 font-semibold italic mb-4">
            “Jodo, Sikho aur Badho – Apni College Life Banaye Smart aur Connected!”
          </p>

          <p className="text-lg md:text-xl text-gray-200 mb-10 font-light">
            A unified platform that empowers{' '}
            <span className="font-semibold text-yellow-300">students</span>,
            <span className="font-semibold text-yellow-300"> faculty</span>, and
            <span className="font-semibold text-yellow-300"> administration</span> to collaborate
            and create a smarter digital campus ecosystem.
          </p>

          {/* Buttons Section */}
          <div className="flex flex-wrap justify-center gap-5">
            <Link
              to="/login"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-yellow-400/40 transform hover:scale-105 transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white/10 hover:bg-white/20 border border-yellow-300 text-yellow-300 font-semibold px-8 py-3 rounded-full transition-all duration-300"
            >
              Register
            </Link>
          </div>
        </div>

        {/* Decorative Floating Shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-16 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl animate-bounce-slow"></div>
      </section>

      {/* ================= ABOUT SECTION ================= */}

      <section className="w-full bg-white py-10 px-6 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">About Campus Connect</h2>
        <p className="max-w-4xl mx-auto text-gray-600 text-lg sm:text-3xl leading-relaxed">
          Campus Connect is not just an app — it’s a revolution in how colleges operate. It bridges
          the gap between students, faculty, and administration by integrating communication,
          resources, and digital collaboration under one powerful platform.
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            to="/about"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-10 py-3 rounded-full shadow-md transition-all duration-300"
          >
            Know More →
          </Link>
        </div>
      </section>

      {/* ================= SERVICES SECTION ================= */}

      <section className="w-full bg-gray-100 py-20 px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-14">Our Core Services</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {[
            {
              icon: <FaUserGraduate className="text-5xl m-auto text-indigo-600 mb-4" />,
              title: 'Lost & Found System',
              desc: 'Report or find lost items easily within the campus with AI-based matching.',
            },
            {
              icon: <FaBookOpen className="text-5xl m-auto text-indigo-600 mb-4" />,
              title: 'Notes & Resource Sharing',
              desc: 'Share study materials, PDFs, and notes organized by subjects and departments.',
            },
            {
              icon: <FaBullhorn className="text-5xl m-auto text-indigo-600 mb-4" />,
              title: 'Notice & Event Alerts',
              desc: 'Receive instant updates for academic notices, events, and workshops.',
            },
            {
              icon: <FaShoppingBag className="text-5xl m-auto text-indigo-600 mb-4" />,
              title: 'Student Marketplace',
              desc: 'Buy and sell used books, gadgets, and accessories within campus securely.',
            },
            {
              icon: <FaHandshake className="text-5xl m-auto text-indigo-600 mb-4" />,
              title: 'Inter-College Networking',
              desc: 'Collaborate with clubs and events across universities in real-time.',
            },
            {
              icon: <FaRobot className="text-5xl m-auto text-indigo-600 mb-4" />,
              title: 'AI Assistant & Analytics',
              desc: 'Your personal AI buddy for insights, summaries, and academic help.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white shadow-lg hover:shadow-2xl p-8 transition-all duration-300 hover:-translate-y-2 border border-gray-100 text-center "
            >
              {item.icon}
              <h3 className="text-2xl font-semibold mb-3 text-indigo-700">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="w-full bg-linear-to-r from-blue-600 to-indigo-700 text-white py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Revolutionize Your Campus?</h2>
        <p className="max-w-2xl mx-auto mb-8 text-gray-100 text-lg">
          Join thousands of students and educators already connected through
          <span className="text-yellow-300 font-semibold"> Campus Connect</span>.
        </p>
        <Link
          to="/register"
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-10 py-3 rounded-full transition-all duration-300 shadow-lg"
        >
          Register Now →
        </Link>
      </section>
      <Footer></Footer>
    </div>
  );
}
