import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FacultyProfile from '../components/FacultyProfile';
import { Footer } from '../components';

export default function Admin() {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ 1. FETCH FACULTY PROFILE (same as user logic)
  useEffect(() => {
    const fetchFacultyProfile = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/v1/admin/', {
          withCredentials: true,
        });

        setProfileData(response.data); // same as your User component
        setIsLoading(false);
      } catch (err) {
        console.error('Faculty profile fetch error:', err);
        setError('Unable to load faculty profile.');
        setIsLoading(false);
      }
    };

    fetchFacultyProfile();
  }, []);

  // ✅ 2. Loading state
  if (isLoading) {
    return (
      <div className="w-full max-w-lg mx-auto mt-20 p-6 text-center text-xl text-gray-700">
        Loading Faculty Profile...
      </div>
    );
  }

  // ✅ 3. Error state
  if (error) {
    return (
      <div className="w-full max-w-lg mx-auto mt-20 p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
        {error}
      </div>
    );
  }

  // ✅ 4. Pass data correctly into FacultyProfile
  const facultyProfileProp = { data: profileData?.data || {} };

  return (
    <div className="min-h-screen bg-gray-100 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6">
          <FacultyProfile profile={facultyProfileProp} />

          <div className="bg-white p-6 rounded-2xl shadow-xl text-center text-gray-500">
            📊 Future Component: Department Quick Stats / Management Tools
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}
