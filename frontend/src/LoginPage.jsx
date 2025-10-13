// LoginPage.jsx
import { useState } from "react";
import { FaMicrochip, FaSignInAlt } from "react-icons/fa";

function LoginPage({ onLogin }) {
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id.trim()) {
      onLogin(id);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400">
      {/* Background overlay with animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 bg-white/10 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-blue-300/20 rounded-full blur-3xl bottom-10 right-10 animate-ping"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-[90%] max-w-md border border-white/20 transition-transform transform hover:scale-[1.02]">
        <div className="flex flex-col items-center mb-6 text-white">
          <FaMicrochip className="text-5xl mb-3 text-cyan-300 animate-bounce" />
          <h1 className="text-3xl font-bold tracking-wide">
            IoT Monitoring Dashboard
          </h1>
          <p className="text-sm text-blue-100 mt-2">
            Smart Insights. Real-Time Data.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white text-sm mb-2 font-medium">
              ID
            </label>
            <input
              type="text"
              placeholder="Enter your ID..."
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg transform transition-transform hover:scale-105"
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
