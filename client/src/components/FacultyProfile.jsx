import React, { useState } from 'react';
import axios from 'axios';

const InfoCard = ({ title, children, initialOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return (
    <div className="bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow duration-200">
      <button
        className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-blue-900">{title}</h3>
        {/* Accordion Icon rotates 180deg when open */}
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {/* Content Area with smooth transition (Shutter effect) */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100 p-5 pt-0' : 'max-h-0 opacity-0 p-0'
        }`}
      >
        <ul className="text-sm space-y-2 text-gray-700 border-t pt-3">
          {children} {/* This holds the list items (data) */}
        </ul>
      </div>
    </div>
  );
};
// --- FacultyProfile Component (Data and Layout) ---
export default function FacultyProfile({ profile }) {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // --- Gracious Handling for Missing Profile Data ---
  if (!profile || !profile.data) {
    return (
      <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md text-center">
        <p className="text-gray-600 font-medium text-lg">⚠️ **No faculty data available**</p>
        <p className="text-sm text-gray-400 mt-1">Please try reloading or log in again.</p>
      </div>
    );
  }

  // Assuming 'profile.data' contains the single faculty member's details (Admin Model)
  const data = profile.data;

  // --- N/A Fallback Logic ---
  const safe = (val, defaultValue = 'N/A') => {
    // Check for null, undefined, empty string, or empty array
    if (val === null || val === undefined || val === '') {
      return defaultValue;
    }
    // Handle array case for subjects
    if (Array.isArray(val) && val.length === 0) {
      return defaultValue;
    }
    return val;
  };

  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'N/A';
      // Attempt to return a simpler date for timestamps
      return new Date(dateString).toLocaleDateString('en-GB');
    } catch {
      return 'N/A';
    }
  };

  // Function to format the subjects array into a comma-separated string
  const formatSubjects = (subjectsArray) => {
    if (!subjectsArray || subjectsArray.length === 0) {
      return 'None assigned';
    }
    // Map to get the subject name (assuming structure is [{ subject: 'name' }]) and join
    return subjectsArray.map((item) => safe(item.subject, 'N/A')).join(', ');
  };

  // The rest of the image upload logic (handleImageUpload, handleUploadToServer) remains unchanged...
  const handleImageUpload = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setImage(URL.createObjectURL(selected));
    }
  };

  const handleUploadToServer = async () => {
    if (!file) return alert('Please select an image first!');
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', file);

      // NOTE: Update the API endpoint for faculty image upload
      const res = await axios.post('/api/upload-faculty-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Profile photo uploaded successfully!');
      console.log('Upload response:', res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to upload. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full mx-auto bg-zinc-700 text-gray-800 rounded-2xl shadow-xl border border-gray-200 overflow-hidden my-6">
      {/* HEADER - Responsive Layout */}
      <div className="relative bg-gray-900 text-white rounded-xl shadow-2xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 overflow-hidden transform hover:scale-[1.01] transition-transform duration-500 ease-out">
        {/* Background Shine/Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-900 via-indigo-950 to-gray-900 opacity-95 rounded-xl"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/noise-texture.svg')" }}
        ></div>

        {/* MAIN CONTENT AREA (Profile & Info) */}
        <div className="flex flex-col lg:flex-row items-center w-full lg:w-3/4 gap-8 z-20">
          {/* Profile Image - Shining Hover Effect */}
          <div className="relative flex flex-col items-center group">
            <div className="relative p-1 rounded-full bg-linear-to-tr from-blue-500 via-purple-500 to-pink-500 transform group-hover:rotate-3 transition-transform duration-500 ease-in-out">
              <img
                // Use a placeholder for the faculty profile image
                src={data.profileImage || '/nocontent.png'}
                alt="Faculty Profile"
                className="w-36 h-36 sm:w-44 sm:h-44 object-cover rounded-full border-4 border-gray-900 shadow-xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Pulsing Blur Effect */}
            <div className="absolute inset-0 rounded-full bg-blue-500/30 blur-3xl scale-110 opacity-0 group-hover:opacity-70 transition-all duration-700 pointer-events-none"></div>

            {/* Upload Controls - Same as UserProfile */}
            <input
              type="file"
              accept="image/*"
              id="facultyUploadInput" // Unique ID
              className="hidden"
              onChange={handleImageUpload}
            />

            <div className="flex gap-3 mt-4">
              <label
                htmlFor="facultyUploadInput" // Use unique ID
                className="bg-white text-gray-900 text-sm px-4 py-1.5 rounded-full cursor-pointer hover:bg-gray-200 font-bold shadow-md transition-all transform hover:scale-105 active:scale-95"
              >
                Choose Image
              </label>

              {file && (
                <button
                  onClick={handleUploadToServer}
                  disabled={uploading}
                  className={`${
                    uploading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'
                  } text-white text-sm px-4 py-1.5 rounded-full font-bold shadow-md transition-all transform hover:scale-105 active:scale-95`}
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
              )}
            </div>
          </div>

          {/* User Info - Adapted for Faculty */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left min-w-0 grow">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-snug wrap-break-word">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-orange-400">
                {safe(data.name)}
              </span>
            </h2>
            <div className="mt-3 pt-2 border-t border-white/20">
              <p className="text-gray-300 text-base md:text-lg whitespace-nowrap">
                <span className="text-blue-300 font-medium">Employee ID:</span>{' '}
                <span className="font-semibold text-white tracking-wider">
                  {safe(data.employeeId)}
                </span>
              </p>
              <p className="text-gray-300 text-base md:text-lg whitespace-nowrap">
                <span className="text-blue-300 font-medium">Role:</span>{' '}
                <span className="font-semibold text-white tracking-wider">{safe(data.role)}</span>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION (Floating Dates) - Clearer Placement and Enhanced Hover */}
        <div className="w-full lg:w-1/4 pt-4 lg:pt-0 flex justify-center lg:justify-end">
          <div className="z-10 bg-white/10 border border-white/20 rounded-lg p-4 text-xs sm:text-sm shadow-xl backdrop-blur-md cursor-default transition-all duration-300 hover:bg-white/20 hover:border-blue-400 hover:shadow-blue-500/50">
            <p className="text-gray-300 whitespace-nowrap">
              <span className="font-light text-blue-300">Created on:</span>{' '}
              <span className="font-medium text-yellow-400 block sm:inline-block">
                {formatDate(data.createdAt)}
              </span>
            </p>
            <p className="text-gray-300 mt-2 whitespace-nowrap">
              <span className="font-light text-blue-300">Last Updated:</span>{' '}
              <span className="font-medium text-yellow-400 block sm:inline-block">
                {formatDate(data.updatedAt)}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* DETAILS SECTION - Responsive Grid */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Info Cards - Basic Information is open by default */}
          <InfoCard title="Contact Information" initialOpen={true}>
            <li>Email: **{safe(data.email)}**</li>
            <li>Phone: {safe(data.phoneNumber)}</li>
          </InfoCard>

          <InfoCard title="Academic Details">
            {/* The model uses department which might be a course/branch */}
            <li>Department: {safe(data.department.name || data.department)}</li>
            <li>College: {safe(data.college.name || data.college)}</li>
          </InfoCard>

          <InfoCard title="Assigned Subjects">
            <li>
              **Subjects:** <span className="block mt-1">{formatSubjects(data.subjects)}</span>
            </li>
          </InfoCard>

          {/* Add more InfoCards as needed, e.g., Address Details if available */}
          {/*
          <InfoCard title="Address Details">
             <li>line1: {safe(data.address?.line1)}</li>
             <li>pincode: {safe(data.address?.pincode)}</li>
          </InfoCard>
          */}
        </div>
      </div>
    </div>
  );
}
