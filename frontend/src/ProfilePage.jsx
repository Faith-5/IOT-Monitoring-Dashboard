import { FaUserCircle, FaIdCard, FaHeartbeat, FaMapMarkerAlt } from "react-icons/fa";

import bgImage from "./static/image1.jpg"; // same background as login
import logo from "./static/image3.jpg"; // logo

function ProfilePage({ user, onContinue }) {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Profile Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-[90%] max-w-md border border-white/20 text-white flex flex-col items-center">
        
        {/* Logo */}
        <img
          src={logo}
          alt="Military Logo"
          className="w-20 h-20 object-contain mb-3"
        />

        <h1 className="text-2xl font-bold mb-1 text-center">
          Soldier Profile
        </h1>
        <p className="text-gray-300 mb-6 text-sm text-center">
          Personnel Identification Record
        </p>

        {/* Avatar */}
        <FaUserCircle className="text-6xl text-gray-300 mb-4" />

        {/* Info Section */}
        <div className="w-full bg-white/10 rounded-xl p-5 space-y-4 border border-white/10">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <FaIdCard className="text-green-400" />
              <span className="text-sm text-gray-300">ID</span>
            </div>
            <span className="font-semibold">{user}</span>
          </div>

          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-400" />
              <span className="text-sm text-gray-300">Unit</span>
            </div>
            <span className="font-semibold">Alpha Squad</span>
          </div>

          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <FaHeartbeat className="text-green-400" />
              <span className="text-sm text-gray-300">Status</span>
            </div>
            <span className="font-semibold text-green-400">Active Duty</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaUserCircle className="text-green-400" />
              <span className="text-sm text-gray-300">Name</span>
            </div>
            <span className="font-semibold">Pvt. John Doe</span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={onContinue}
          className="mt-8 w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-lg shadow-lg transition"
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;