import React from 'react';
import { EventCard } from '../components';

export default function Tests() {
  // Mock API response (same structure as backend returns)
  const response = {
    success: true,
    message: 'Events fetched successfully.',
    data: [
      {
        eventId: '690b0f274fc198ae087da8a9',
        title: 'Testing Event',
        link: 'https://youtube.com',
        _id: '690b0f274fc198ae087da8ab',
      },
      {
        eventId: '690b0f274fc198ae087da8ac',
        title: 'Workshop on AI',
        link: 'https://openai.com',
        _id: '690b0f274fc198ae087da8ad',
      },
    ],
  };

  const events = response.data; // extract events list

  return (
    <div className="w-[1300px] mx-auto min-h-screen bg-gray-50 py-10">
      <h1 className="text-2xl font-bold mb-8 text-center text-gray-800">
        Event Details (Static Test)
      </h1>

      {/* Pass the event data to EventCard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
