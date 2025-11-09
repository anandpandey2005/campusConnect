import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Footer, LostFoundProduct, UserProfile } from '../components';
import EventCard from '../components/EventCard';

export default function User() {
  const [products, setProducts] = useState([]);
  const [events, setEvents] = useState([]);
  const [seenLost, setSeenLost] = useState(0);
  const [seenFound, setSeenFound] = useState(0);
  const lostRef = useRef(null);
  const foundRef = useRef(null);

  // --- 1️⃣ USER PROFILE ---
  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/v1/user/', {
          withCredentials: true,
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setProfileData(null);
      }
    };
    fetchUserProfile();
  }, []);

  // --- 2️⃣ LOST & FOUND ---
  useEffect(() => {
    const fetchLostFoundProducts = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/v1/user/get-lostFoundProduct', {
          withCredentials: true,
        });
        setProducts(response.data.data || []);
      } catch (error) {
        console.error('Error fetching lost/found products:', error);
      }
    };
    fetchLostFoundProducts();
  }, []);

  // --- 3️⃣ EVENTS FETCH ---
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:2000/api/v1/user/get-event-details', {
          withCredentials: true,
        });
        setEvents(res.data.data || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  // --- SCROLL LOGIC (unchanged) ---
  const handleScroll = (ref, setSeen) => {
    if (!ref.current) return;
    const container = ref.current;
    const cards = container.querySelectorAll('.product-item');
    const scrollTop = container.scrollTop;

    if (cards.length === 0) {
      setSeen(0);
      return;
    }

    let count = 0;
    const parentRect = container.getBoundingClientRect();

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      if (rect.bottom <= parentRect.bottom && rect.top >= parentRect.top - 20) {
        count++;
      }
    });

    const cardHeight = cards[0]?.offsetHeight || 150;
    const cardsScrolled = Math.floor(scrollTop / (cardHeight + 20));
    setSeen(Math.min(cardsScrolled + count, cards.length));
  };

  useEffect(() => {
    const lost = lostRef.current;
    const found = foundRef.current;

    const scrollHandlerLost = () => handleScroll(lostRef, setSeenLost);
    const scrollHandlerFound = () => handleScroll(foundRef, setSeenFound);

    if (lost) lost.addEventListener('scroll', scrollHandlerLost);
    if (found) found.addEventListener('scroll', scrollHandlerFound);

    scrollHandlerLost();
    scrollHandlerFound();

    return () => {
      if (lost) lost.removeEventListener('scroll', scrollHandlerLost);
      if (found) found.removeEventListener('scroll', scrollHandlerFound);
    };
  }, [products]);

  // --- 4️⃣ RENDER ---
  return (
    <div className="max-w-[1500px] mx-auto px-4 md:px-6 overflow-hidden bg-white">
      {/* USER PROFILE */}
      {profileData ? (
        <UserProfile profile={profileData} />
      ) : (
        <div className="w-full max-w-6xl mx-auto my-6 p-6 text-center text-gray-500">
          Loading User Profile...
        </div>
      )}

      {/* LOST & FOUND SECTION */}
      <div className="text-center my-8">
        <h1 className="text-3xl font-extrabold text-gray-800 border-b-2 border-indigo-500 inline-block pb-1">
          Lost & Found Board
        </h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-6 mt-4">
        {/* Lost Section */}
        <div className="w-full md:w-[48%] h-[520px] p-4 rounded-2xl shadow-xl bg-linear-to-br from-blue-900 to-indigo-800 text-white overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="flex justify-between items-center mb-3 border-b border-indigo-500 pb-2">
            <h1 className="text-2xl font-semibold">Lost Products</h1>
            <div className="text-right font-mono">
              <p className="text-sm text-gray-300">
                Viewed: <span className="font-bold text-green-400">{seenLost}</span> /{' '}
                {products.length}
              </p>
            </div>
          </div>

          <div ref={lostRef} className="w-full h-full overflow-y-auto custom-scrollbar pb-6">
            <div className="flex flex-wrap gap-4 justify-center">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product._id} className="product-item">
                    <LostFoundProduct product={product} />
                  </div>
                ))
              ) : (
                <p className="text-gray-300">No lost items posted yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Found Section */}
        <div className="w-full md:w-[48%] h-[520px] p-4 rounded-2xl shadow-xl bg-linear-to-br from-purple-900 to-violet-800 text-white overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="flex justify-between items-center mb-3 border-b border-violet-500 pb-2">
            <h1 className="text-2xl font-semibold">Found Products</h1>
            <div className="text-right font-mono">
              <p className="text-sm text-gray-300">
                Viewed: <span className="font-bold text-green-400">{seenFound}</span> /{' '}
                {products.length}
              </p>
            </div>
          </div>

          <div ref={foundRef} className="w-full h-full overflow-y-auto custom-scrollbar pb-6">
            <div className="flex flex-wrap gap-4 justify-center">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product._id} className="product-item">
                    <LostFoundProduct product={product} />
                  </div>
                ))
              ) : (
                <p className="text-gray-300">No found items posted yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ UPCOMING EVENTS SECTION */}
      <div className="w-full my-12 px-5 border-2 border-purple-300 text-center  rounded-2xl">
        <h2 className="text-3xl font-extrabold text-black border-b-2 border-blue-600 inline-block mb-6">
          Upcoming Events
        </h2>

        {/* HORIZONTAL SCROLL */}
        <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar snap-x snap-mandatory">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event._id}
                className="shrink-0 snap-start w-[85%] sm:w-[300px] md:w-[340px] lg:w-[360px]"
              >
                <EventCard event={event} />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center w-full">No upcoming events.</p>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 text-lg sm:text-xl font-bold text-center text-white bg-black rounded-xl py-4 shadow-md">
        <h1>“Jodo, Sikho aur Badho – Apni College Life Banaye Smart aur Connected!”</h1>
      </div>

      <Footer />
    </div>
  );
}
