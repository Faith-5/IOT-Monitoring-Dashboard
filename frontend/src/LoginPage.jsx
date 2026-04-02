import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";

import bgImage from "./static/image1.jpg"; // flag + soldier
import logo from "./static/image3.jpg"; // military logo

function LoginPage({ onLogin }) {
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id.trim()) {
      onLogin(id);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Login Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-[90%] max-w-md border border-white/20">
        
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6 text-white">
          <img
            src={logo}
            alt="Military Logo"
            className="w-20 h-20 object-contain mb-3"
          />
          <h1 className="text-2xl font-bold tracking-wide text-center">
            Military Monitoring System
          </h1>
          <p className="text-sm text-gray-300 mt-2 text-center">
            Secure Access Portal
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white text-sm mb-2 font-medium">
              Personnel ID
            </label>
            <input
              type="text"
              placeholder="Enter your ID..."
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-lg shadow-lg transition"
          >
            <FaSignInAlt />
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;