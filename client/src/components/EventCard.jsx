import React from 'react';
import { FaMapMarkerAlt, FaRegClock, FaCalendarAlt, FaUserTie, FaPhoneAlt } from 'react-icons/fa';

export default function EventCard({ event }) {
  return (
    <div
      className="relative w-full sm:w-[300px] md:w-[340px] lg:w-[360px]
                 aspect-3/4 overflow-hidden shadow-lg bg-black rounded-xl group
                 transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* IMAGE SECTION */}
      <img
        src={event?.eventId?.image || '/nocontent.png'}
        alt={event?.eventId?.title || 'Event'}
        className="w-full h-full object-cover transition-all duration-700 ease-out 
                   group-hover:grayscale group-hover:opacity-80 group-hover:scale-110"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-70"></div>

      {/* TITLE (Visible Before Hover) */}
      <div className="absolute bottom-4 left-0 w-full px-4 text-white z-10 group-hover:hidden">
        <h3 className="text-lg sm:text-xl font-semibold drop-shadow-md tracking-wide text-center">
          {event?.eventId?.title || 'Untitled Event'}
        </h3>
      </div>

      {/* HOVER INFO SECTION (Slides Up) */}
      <div
        className="absolute bottom-0 left-0 w-full h-0 bg-white/95 backdrop-blur-md 
                   overflow-hidden flex flex-col justify-between rounded-t-2xl
                   group-hover:h-[75%] group-hover:opacity-100 opacity-0 
                   transition-all duration-700 ease-in-out p-4 sm:p-5"
      >
        {/* Event Info */}
        <div className="flex-1 overflow-y-auto">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
            {event?.eventId?.title || 'Untitled Event'}
          </h3>

          <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 mb-2 sm:mb-3">
            {event?.eventId?.description ||
              'Join us for an exciting event that inspires innovation and collaboration.'}
          </p>

          {/* Event Details */}
          <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700">
            <p className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-blue-600 mt-0.5" />
              <span>
                <span className="font-medium text-gray-800">Venue:</span>{' '}
                {event?.eventId?.venue || 'Main Auditorium'}
              </span>
            </p>

            <p className="flex items-start gap-2">
              <FaRegClock className="text-blue-600 mt-0.5" />
              <span>
                <span className="font-medium text-gray-800">Time:</span>{' '}
                {event?.eventId?.time || '10:00 AM - 4:00 PM'}
              </span>
            </p>

            <p className="flex items-start gap-2">
              <FaCalendarAlt className="text-blue-600 mt-0.5" />
              <span>
                <span className="font-medium text-gray-800">Last Date of Registration:</span>{' '}
                {event?.eventId?.lastDate || '15 Nov 2025'}
              </span>
            </p>

            <p className="flex items-start gap-2">
              <FaUserTie className="text-blue-600 mt-0.5" />
              <span>
                <span className="font-medium text-gray-800">Coordinator:</span>{' '}
                {event?.eventId?.coordinatorName || 'N/A'}
              </span>
            </p>

            <p className="flex items-start gap-2">
              <FaPhoneAlt className="text-blue-600 mt-0.5" />
              <span>
                <span className="font-medium text-gray-800">Contact:</span>{' '}
                {event?.eventId?.coordinatorContact || '+91 9876543210'}
              </span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <a
            href={event?.eventId?.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-xs sm:text-sm font-medium hover:underline text-center sm:text-left"
          >
            View Details →
          </a>

          <button
            className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg 
                       hover:from-blue-700 hover:to-indigo-700 shadow-md 
                       transition-all duration-300 text-xs sm:text-sm font-medium w-full sm:w-auto"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
