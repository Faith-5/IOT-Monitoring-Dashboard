import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useLiveLocation } from "./hooks/useLiveLocation";
import useSensorData from "./hooks/useSensorHook";
import useSensorCharts from "./hooks/useSensorCharts";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaMapMarkerAlt, FaHome, FaChartLine } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard({ user }) {
  const data = useSensorData();
  const { lat, lng, place } = useLiveLocation();
  const { tempData, heartbeatData, tempOptions, heartbeatOptions } = useSensorCharts();

  const [activeTab, setActiveTab] = useState("home");

  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  const metrics = data
    ? [
        { title: "GPS Coordinates", value: `${data.gps}` },
        { title: "Temperature", value: `${data.temperature} °C` },
        { title: "Heartbeat", value: `${data.heartbeat} bpm` },
        { title: "Blood Volume Pulse", value: `${data.bloodVolumePulse}%` },
        { title: "Motion", value: `${data.motion}` },
        { title: "Voice", value: `${data.voice}` },
      ]
    : [
        { title: "GPS Coordinates", value: "…" },
        { title: "Temperature", value: "…" },
        { title: "Heartbeat", value: "…" },
        { title: "Blood Volume Pulse", value: "…" },
        { title: "Motion", value: "…" },
        { title: "Voice", value: "…" },
      ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-blue-100 p-4 sm:p-6">
      {/* Navigation Bar */}
      <header className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-lg mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide mb-2 md:mb-0 text-center md:text-left">
          IoT Monitoring Dashboard
        </h1>

        <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 sm:gap-6">
          <nav className="flex flex-wrap justify-center gap-2 sm:gap-4 text-white text-sm sm:text-base font-semibold">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg transition ${
                activeTab === "home"
                  ? "bg-white/30 backdrop-blur-md"
                  : "hover:bg-white/10"
              }`}
            >
              <FaHome /> Home
            </button>

            <button
              onClick={() => setActiveTab("charts")}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg transition ${
                activeTab === "charts"
                  ? "bg-white/30 backdrop-blur-md"
                  : "hover:bg-white/10"
              }`}
            >
              <FaChartLine /> Charts
            </button>

            <button
              onClick={() => setActiveTab("location")}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg transition ${
                activeTab === "location"
                  ? "bg-white/30 backdrop-blur-md"
                  : "hover:bg-white/10"
              }`}
            >
              <FaMapMarkerAlt /> Location
            </button>
          </nav>

          <div className="text-xs sm:text-sm md:text-base bg-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg backdrop-blur-md shadow-md text-center">
            <span className="font-semibold">ID:</span> {user}
          </div>
        </div>
      </header>

      {/* Last Updated */}
      <p className="text-xs sm:text-sm text-gray-500 text-center mb-6">
        Last Updated: {currentDate} {currentTime}
      </p>

      {/* HOME TAB */}
      {activeTab === "home" && (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-md border border-blue-100 rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1 p-4 text-center"
            >
              <h2 className="text-base sm:text-lg font-semibold text-blue-700 mb-2">
                {metric.title}
              </h2>
              <p className="text-lg sm:text-xl font-bold text-blue-500 break-words">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* CHARTS TAB */}
      {activeTab === "charts" && (
        <div className="space-y-8 sm:space-y-12">
          <div className="bg-white/90 border border-blue-100 rounded-xl shadow-md p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 text-center">
              Temperature Trends
            </h2>
            <div className="h-[250px] sm:h-[350px] w-full flex justify-center">
              <Line data={tempData} options={tempOptions} />
            </div>
          </div>

          <div className="bg-white/90 border border-blue-100 rounded-xl shadow-md p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 text-center">
              Heartbeat Trends
            </h2>
            <div className="h-[250px] sm:h-[350px] w-full flex justify-center">
              <Line data={heartbeatData} options={heartbeatOptions} />
            </div>
          </div>
        </div>
      )}

      {/* LOCATION TAB */}
      {activeTab === "location" && (
        <div className="p-4 sm:p-6 bg-white/90 border border-blue-100 rounded-xl shadow-md hover:shadow-xl transition">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-6 text-center">
            <FaMapMarkerAlt className="text-cyan-600 text-2xl sm:text-3xl" />
            <h1 className="text-xl sm:text-2xl font-bold text-blue-700">
              Location Tracker
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg shadow p-4 text-center border border-blue-100">
              <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-1">Latitude</h2>
              <p className="text-lg sm:text-xl font-bold text-blue-600">{lat}</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg shadow p-4 text-center border border-blue-100">
              <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-1">Longitude</h2>
              <p className="text-lg sm:text-xl font-bold text-blue-600">{lng}</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg shadow p-4 text-center border border-blue-100 md:col-span-3">
              <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-1">Place</h2>
              <p className="text-sm sm:text-md font-medium text-blue-600">{place}</p>
            </div>
          </div>

          <div className="w-full h-[300px] sm:h-[400px] rounded-xl overflow-hidden">
            <MapContainer
              center={[lat, lng]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              key={`${lat}-${lng}`}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[lat, lng]}>
                <Popup>{place}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;