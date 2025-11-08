import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900 px-4">
      {/* Card */}
      <div className="bg-white rounded-2xl p-10 text-center shadow-xl max-w-md border border-gray-200">
        <h1 className="text-6xl font-extrabold mb-4 text-gray-800">404</h1>
        <h2 className="text-3xl font-semibold mb-4 text-gray-700">Page Not Found</h2>
        <p className="mb-6 text-base text-gray-600">
          Oops! The page you’re looking for doesn’t exist or has been moved. <br />
          Welcome to <span className="font-bold">Campus Connect</span>, your hub for all campus
          updates.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-gray-900 text-white rounded-full font-semibold shadow-md hover:bg-gray-800 transition-colors duration-300"
        >
          Back to Home
        </button>
      </div>

      {/* Optional footer */}
      <p className="mt-8 text-gray-500 text-sm">
        Campus Connect © {new Date().getFullYear()} | Stay connected with your campus community
      </p>
    </div>
  );
}
