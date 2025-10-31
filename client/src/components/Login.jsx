import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
    role: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // ✅ Adjusted API URL
      const res = await axios.post(
        'http://localhost:2000/api/auth/login',
        formData,
        { withCredentials: true } // ✅ Important to receive HttpOnly cookie
      );

      if (res.data?.success) {
        setSuccess('✅ Logged in successfully!');
        localStorage.setItem('user', JSON.stringify(res.data.data.user));

        // Optional: if you also return token in response, save it
        // localStorage.setItem("token", res.data.data.token);

        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setError(res.data?.message || 'Login failed. Try again!');
      }
    } catch (err) {
      setError(err.response?.data?.message || '❌ Server error. Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-600 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1')] bg-cover bg-center opacity-30"></div>

      {/* Login Card */}
      <div className="relative z-10 backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 w-[90%] max-w-md text-white">
        <h2 className="text-3xl font-bold text-center">Welcome Back to</h2>
        <h2 className="text-3xl font-bold text-center mb-2">
          <span className="text-yellow-300">Campus Connect</span>
        </h2>

        <p className="text-center text-gray-200 mb-8 text-sm">
          Login to continue exploring your smart college network
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">-- Select Role --</option>
              {/* ✅ Match exact role cases with backend */}
              <option value="SuperAdmin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold transition duration-300 shadow-lg ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
            }`}
          >
            {loading ? 'Logging in...' : 'Login →'}
          </button>

          {/* Error / Success Messages */}
          {error && <p className="text-red-400 text-center text-sm mt-2">{error}</p>}
          {success && <p className="text-green-400 text-center text-sm mt-2">{success}</p>}

          {/* Extra Links */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-200">
              Don’t have an account?{' '}
              <Link to="/register" className="text-yellow-300 hover:text-yellow-400 font-medium">
                Register
              </Link>
            </p>
            <p className="text-sm text-gray-300 mt-2 hover:text-yellow-300 cursor-pointer">
              Forgot Password?
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
