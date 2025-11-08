import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Assuming FacultyProfile is in a components folder:
import FacultyProfile from '../components/FacultyProfile';
import { Footer } from '../components';

const MOCK_FACULTY_PROFILE_DATA = {
  success: true,
  message: 'Mock details loaded successfully',
  data: {
    _id: '690f97c7f7c195d4ed0b30ba',
    // Replace with a default image path if available, or a random image URL
    profileImage: 'https://randomuser.me/api/portraits/men/82.jpg',
    name: 'Dr. Evelyn Reed',
    employeeId: 'EMP005',
    email: 'evelyn.reed@globalcollege.edu',
    phoneNumber: '9988776655',
    // Assuming department and college objects are populated
    department: {
      _id: '690a5aeafc04c9117951e65b',
      name: 'Computer Applications',
    },
    college: {
      _id: '690a5ab9fc04c9117951e657',
      name: 'Global College of Technology',
    },
    subjects: [
      { subject: 'Advanced Algorithms' },
      { subject: 'Database Management' },
      { subject: 'Operating Systems' },
    ],
    role: 'Admin/HOD', // Customizing the role slightly
    createdAt: '2024-03-01T10:00:00.000Z',
    updatedAt: '2024-11-08T19:19:35.291Z',
  },
};

export default function Admin() {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- MOCK DATA LOADING LOGIC (Simulates fetching) ---
  useEffect(() => {
    // Simulate network delay
    const loadMockData = setTimeout(() => {
      setProfileData(MOCK_FACULTY_PROFILE_DATA);
      setIsLoading(false);
      // If you want to test the error state, uncomment the next two lines:
      // setError('Testing connection error...');
      // setIsLoading(false);
    }, 1000); // 1 second delay

    return () => clearTimeout(loadMockData);
  }, []);
  // ---------------------------------------------------

  // --- Loading and Error States ---
  if (isLoading) {
    return (
      <div className="w-full max-w-lg mx-auto mt-20 p-6 text-center text-xl text-gray-700">
        🔄 Loading Admin Profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-lg mx-auto mt-20 p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
        **Error:** {error}
      </div>
    );
  }

  // Structure the data to match the expectation of FacultyProfile (which expects { data: ... })
  const facultyProfileProp = { data: profileData?.data || {} };

  return (
    <div className="min-h-screen bg-gray-100 pt-8">
      {/* Main Content Grid (Ready for multiple components) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6">
          {/* 1. Faculty/Admin Profile Component */}
          <FacultyProfile profile={facultyProfileProp} />

          {/* 2. Placeholder for other admin-specific components */}
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center text-gray-500">
            📊 **Future Component:** Department Quick Stats / Management Tools
          </div>
        </div>
      </div>

      {/* Footer is placed below the main content */}
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}
