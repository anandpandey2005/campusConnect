import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// NOTE: Since this is a single file, we use standard Tailwind animations. 
// If you need custom animations like 'animate-bounce-slow', you would typically define them in a global CSS file.

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
    role: 'user', 
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await axios.post(
        'http://localhost:2000/api/auth/login',
        {
          phoneNumber: formData.phoneNumber,
          password: formData.password,
          role: formData.role.toLowerCase(),
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setSuccess('Login successful!');
        // NOTE: In a production app, use Firestore/secure storage, not localStorage.
        localStorage.setItem('user', JSON.stringify(res.data.data.user)); 

        const userRole = res.data.data.user.role?.toLowerCase();
        if (userRole === 'superadmin') navigate('/superadmin');
        else if (userRole === 'admin') navigate('/admin');
        else navigate('/user');
      } else {
        setError(res.data.message || 'Login failed. Try again!');
      }
    } catch (err) {
      console.error('Login Error:', err.response);
      setError(
        err.response?.data?.message || `Server error: ${err.message}. Check console for details.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    // Outer Container: Matched Gradient Background
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-800 via-purple-700 to-blue-700 relative overflow-hidden p-4">
      
      {/* Background overlay (Placeholder image removed, using texture simulation for stability) */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\" viewBox=\"0 0 100 100\"><circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"rgba(255,255,255,0.05)\" /></svg>')" }}></div>

      {/* Floating glow effects (Matched to Register.jsx) */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-400/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-10 right-16 w-32 h-32 bg-indigo-400/30 rounded-full blur-3xl animate-pulse delay-500"></div>

      {/* Login Card: Frosted Glass Effect (Matched to Register.jsx) */}
      <div className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md text-white transition-all duration-300 hover:shadow-yellow-400/50">
        
        <h2 className="text-3xl font-bold text-center mb-8">
          Welcome Back to <span className="text-yellow-300">Campus Connect</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Phone Number Input */}
          <div>
            <label className="block text-sm mb-1 text-gray-200">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              // Input Styling: Matched translucent background and Yellow focus ring
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all duration-300"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm mb-1 text-gray-200">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              // Input Styling: Matched translucent background and Yellow focus ring
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all duration-300"
              required
            />
          </div>

          {/* Role Select */}
          <div className="relative">
            <label className="block text-sm mb-1 text-gray-200">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              // Input Styling: Matched translucent background and Yellow focus ring
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none appearance-none cursor-pointer transition-all duration-300"
            >
              <option value="user" className="bg-indigo-800 text-white">Student</option>
              <option value="admin" className="bg-indigo-800 text-white">Staff</option>
              <option value="superadmin" className="bg-indigo-800 text-white">College Admin</option>
            </select>
            {/* Custom chevron icon */}
            <div className="absolute inset-y-0 right-0 top-6 flex items-center px-4 pointer-events-none text-gray-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          {/* Login Button: Matched Yellow Accent Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-lg transition duration-300 shadow-xl transform hover:scale-[1.01] active:scale-[0.99] ${
              loading
                ? 'bg-gray-400 text-gray-800 cursor-not-allowed'
                : 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 hover:shadow-yellow-400/60'
            }`}
          >
            {loading ? 'Authenticating...' : 'Login →'}
          </button>
        </form>

        {/* Messages */}
        {error && <p className="text-red-300 text-center font-medium mt-6 p-3 bg-red-900/30 border border-red-700 rounded-lg">{error}</p>}
        {success && <p className="text-green-300 text-center font-medium mt-6 p-3 bg-green-900/30 border border-green-700 rounded-lg">{success}</p>}

        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-300">
            Don't have an account?{' '}
            <Link to="/register" className="text-yellow-300 hover:text-yellow-400 font-medium">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
