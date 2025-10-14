import { FaUserCircle, FaIdCard, FaHeartbeat, FaMapMarkerAlt } from "react-icons/fa";

function ProfilePage({ user, onContinue }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400 relative">
      {/* Background circles for visual depth */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 bg-white/10 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-blue-300/20 rounded-full blur-3xl bottom-10 right-10 animate-ping"></div>
      </div>

      {/* Profile Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-[90%] max-w-md border border-white/20 text-white flex flex-col items-center transition-transform hover:scale-[1.02]">
        <FaUserCircle className="text-7xl text-cyan-300 mb-4 animate-bounce" />
        <h1 className="text-3xl font-bold mb-2">Soldier Profile</h1>
        <p className="text-cyan-200 mb-6 text-sm">Field Monitoring Identification</p>

        <div className="w-full bg-white/10 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-3">
            <FaIdCard className="text-cyan-300 text-lg" />
            <p><span className="font-semibold">ID:</span> {user}</p>
          </div>

          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-cyan-300 text-lg" />
            <p><span className="font-semibold">Unit:</span> Alpha Squad</p>
          </div>

          <div className="flex items-center gap-3">
            <FaHeartbeat className="text-cyan-300 text-lg" />
            <p><span className="font-semibold">Status:</span> Active Duty</p>
          </div>

          <div className="flex items-center gap-3">
            <FaUserCircle className="text-cyan-300 text-lg" />
            <p><span className="font-semibold">Name:</span> Pvt. John Doe</p>
          </div>
        </div>

        <button
          onClick={onContinue}
          className="mt-8 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-transform hover:scale-105"
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
