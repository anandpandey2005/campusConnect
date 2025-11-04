import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Footer, LostFoundProduct, UserProfile } from '../components';

export default function User() {
  // Hardcoded profile data for development/mocking purposes.
  // We wrap the raw user data inside a 'data' property and add 'success: true'
  // to match the expected API response structure used by the UserProfile component.

  const [products, setProducts] = useState([]);
  const [seenLost, setSeenLost] = useState(0);
  const [seenFound, setSeenFound] = useState(0);
  const lostRef = useRef(null);
  const foundRef = useRef(null);

  // --- 1. User Profile Data Loading (Commented out API fetch) ---

  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/v1/user/get-profile-details', {
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

  // --- 2. Fetch Lost & Found Products (Existing Logic) ---
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

  // --- Scroll progress tracker (Existing Logic) ---
  const handleScroll = (ref, setSeen) => {
    if (!ref.current) return;
    const container = ref.current;
    const cards = container.querySelectorAll('.product-item');
    const scrollTop = container.scrollTop;

    // Safety check for empty cards array
    if (cards.length === 0) {
      setSeen(0);
      return;
    }

    let count = 0;
    const parentRect = container.getBoundingClientRect();

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      // Check if the card is mostly visible within the scroll container
      if (rect.bottom <= parentRect.bottom && rect.top >= parentRect.top - 20) {
        count++;
      }
    });

    // Simple estimation of "seen" items
    const cardHeight = cards[0]?.offsetHeight || 150;
    const cardsScrolled = Math.floor(scrollTop / (cardHeight + 20));
    setSeen(Math.min(cardsScrolled + count, cards.length));
  };

  useEffect(() => {
    const lost = lostRef.current;
    const found = foundRef.current;

    // Helper function to handle event attachment/detachment
    const scrollHandlerLost = () => handleScroll(lostRef, setSeenLost);
    const scrollHandlerFound = () => handleScroll(foundRef, setSeenFound);

    if (lost) lost.addEventListener('scroll', scrollHandlerLost);
    if (found) found.addEventListener('scroll', scrollHandlerFound);

    // Initial check
    scrollHandlerLost();
    scrollHandlerFound();

    return () => {
      if (lost) lost.removeEventListener('scroll', scrollHandlerLost);
      if (found) found.removeEventListener('scroll', scrollHandlerFound);
    };
  }, [products]);

  // --- Component Render ---
  return (
    <div className="max-w-[1500px] mx-auto px-4 md:px-6 overflow-hidden bg-white">
      {/* 🛑 USER PROFILE SECTION (Using Mock Data) 🛑 */}
      {/* We pass the profileData object which contains { success: ..., data: ... } */}
      {profileData ? (
        <UserProfile profile={profileData} />
      ) : (
        // This won't run with hardcoded data, but it's good practice
        <div className="w-full max-w-6xl mx-auto my-6 p-6 text-center text-gray-500">
          Loading User Profile...
        </div>
      )}

      {/* --- LOST & FOUND UI --- */}
      <div className="text-center my-8">
        <h1 className="text-3xl font-extrabold text-gray-800 border-b-2 border-indigo-500 inline-block pb-1">
          Lost & Found Board
        </h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-6 mt-4">
        {/* Lost Products Section */}
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

        {/* Found Products Section */}
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

      {/* CTA Section */}
      <div className="mt-6 text-lg sm:text-xl font-bold text-center text-white bg-black rounded-xl py-4 shadow-md">
        <h1>“Jodo, Sikho aur Badho – Apni College Life Banaye Smart aur Connected!”</h1>
      </div>

      <Footer />
    </div>
  );
}
