import React, { useEffect, useState } from 'react';
import { LostFoundProduct, UserProfile } from '../components';
import axios from 'axios';

export default function Tests() {
  const data ={
  success: true,
  data: {
    fullName: "Arun Pandey",
    admissionNumber: "GLB123456",
    dob: "2004-07-15T00:00:00.000Z",
    caste: "N/A",
    email: "arunpandey@example.com",
    phoneNumber: "9876543210",
    fatherName: "Rajesh Pandey",
    motherName: "Sunita Pandey",
    course: [{ name: "Global College" }],
    role: "user",
  },
};
  return (
    <div className="w-[1300px] mx-auto min-h-screen bg-gray-50">
      <UserProfile profile ={data}></UserProfile>
    </div>
  );
}
