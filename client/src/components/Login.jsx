import React from 'react';

export default function Login() {
  return (
    <div className="w-auto m-auto flex  justify-center self-center z-1">
      <fieldset className="flex flex-col gap-4 w-80 border border-blue-500 p-4 rounded-md">
        <legend className="text-lg font-semibold text-blue-700 px-2">Login</legend>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter phone number"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Role Selection */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-1">
            Select Role
          </label>
          <select
            id="role"
            name="role"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Role --</option>
            <option value="superAdmin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
      </fieldset>
    </div>
  );
}
