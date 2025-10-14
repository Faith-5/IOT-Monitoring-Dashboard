import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
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

  // State to handle page navigation
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-blue-100 p-6">
      {/* Navigation Bar */}
      <header className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white px-6 py-4 rounded-xl shadow-lg mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide mb-2 md:mb-0">
          IoT Monitoring Dashboard
        </h1>
        <div className="flex items-center gap-6">
          <nav className="flex gap-4 text-white text-lg font-semibold">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
                activeTab === "home"
                  ? "bg-white/30 backdrop-blur-md"
                  : "hover:bg-white/10"
              }`}
            >
              <FaHome /> Home
            </button>

            <button
              onClick={() => setActiveTab("charts")}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
                activeTab === "charts"
                  ? "bg-white/30 backdrop-blur-md"
                  : "hover:bg-white/10"
              }`}
            >
              <FaChartLine /> Charts
            </button>

            <button
              onClick={() => setActiveTab("location")}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
                activeTab === "location"
                  ? "bg-white/30 backdrop-blur-md"
                  : "hover:bg-white/10"
              }`}
            >
              <FaMapMarkerAlt /> Location
            </button>
          </nav>

          <div className="text-sm md:text-base bg-white/20 px-4 py-2 rounded-lg backdrop-blur-md shadow-md">
            <span className="font-semibold">ID:</span> {user}
          </div>
        </div>
      </header>

      {/* Last Updated */}
      <p className="text-sm text-gray-500 text-center mb-6">
        Last Updated: {currentDate} {currentTime}
      </p>

      {/* HOME TAB */}
      {activeTab === "home" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-md border border-blue-100 rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1 p-4 text-center"
            >
              <h2 className="text-lg font-semibold text-blue-700 mb-2">
                {metric.title}
              </h2>
              <p className="text-xl font-bold text-blue-500">{metric.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* CHARTS TAB */}
      {activeTab === "charts" && (
        <div className="space-y-12">
          <div className="bg-white/90 border border-blue-100 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
              Temperature Trends
            </h2>
            <div className="h-[350px] w-full flex justify-center">
              <Line data={tempData} options={tempOptions} />
            </div>
          </div>

          <div className="bg-white/90 border border-blue-100 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
              Heartbeat Trends
            </h2>
            <div className="h-[350px] w-full flex justify-center">
              <Line data={heartbeatData} options={heartbeatOptions} />
            </div>
          </div>
        </div>
      )}

      {/* LOCATION TAB */}
      {activeTab === "location" && (
        <div className="p-6 bg-white/90 border border-blue-100 rounded-xl shadow-md hover:shadow-xl transition">
          <div className="flex items-center justify-center gap-2 mb-6">
            <FaMapMarkerAlt className="text-cyan-600 text-2xl" />
            <h1 className="text-2xl font-bold text-blue-700">
              Location Tracker
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg shadow p-4 text-center border border-blue-100">
              <h2 className="text-lg font-semibold text-gray-700 mb-1">Latitude</h2>
              <p className="text-xl font-bold text-blue-600">{lat}</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg shadow p-4 text-center border border-blue-100">
              <h2 className="text-lg font-semibold text-gray-700 mb-1">Longitude</h2>
              <p className="text-xl font-bold text-blue-600">{lng}</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg shadow p-4 text-center border border-blue-100 md:col-span-3">
              <h2 className="text-lg font-semibold text-gray-700 mb-1">Place</h2>
              <p className="text-md font-medium text-blue-600">{place}</p>
            </div>
          </div>

          <MapContainer
            center={[lat, lng]}
            zoom={13}
            style={{ height: "400px", width: "100%", borderRadius: "12px" }}
            key={`${lat}-${lng}`}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[lat, lng]}>
              <Popup>{place}</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
}

export default Dashboard;