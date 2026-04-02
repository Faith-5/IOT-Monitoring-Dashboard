import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

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

import logo from "./static/image3.jpg";

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
        { title: "GPS", value: `${data.gps}` },
        { title: "Temp", value: `${data.temperature} °C` },
        { title: "Heartbeat", value: `${data.heartbeat} bpm` },
        { title: "Blood Pulse", value: `${data.bloodVolumePulse}%` },
        { title: "Motion", value: `${data.motion}` },
        { title: "Voice", value: `${data.voice}` },
      ]
    : [
        { title: "GPS", value: "…" },
        { title: "Temp", value: "…" },
        { title: "Heartbeat", value: "…" },
        { title: "Blood Pulse", value: "…" },
        { title: "Motion", value: "…" },
        { title: "Voice", value: "…" },
      ];

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6">

      {/* NAVBAR */}
      <header className="flex flex-col md:flex-row justify-between items-center bg-[#0a0f0a] border border-green-900 px-6 py-4 rounded-xl shadow-lg mb-8">
        
        <div className="flex items-center gap-3 mb-3 md:mb-0">
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <h1 className="text-xl md:text-2xl font-bold tracking-wide text-green-400">
            Military Command Dashboard
          </h1>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <nav className="flex gap-3 text-sm font-semibold">
            
            <button
              onClick={() => setActiveTab("home")}
              className={`flex items-center gap-2 px-3 py-1 rounded ${
                activeTab === "home"
                  ? "bg-green-700"
                  : "hover:bg-green-900"
              }`}
            >
              <FaHome />
              <span>Home</span>
            </button>

            <button
              onClick={() => setActiveTab("charts")}
              className={`flex items-center gap-2 px-3 py-1 rounded ${
                activeTab === "charts"
                  ? "bg-green-700"
                  : "hover:bg-green-900"
              }`}
            >
              <FaChartLine />
              <span>Charts</span>
            </button>

            <button
              onClick={() => setActiveTab("location")}
              className={`flex items-center gap-2 px-3 py-1 rounded ${
                activeTab === "location"
                  ? "bg-green-700"
                  : "hover:bg-green-900"
              }`}
            >
              <FaMapMarkerAlt />
              <span>Location</span>
            </button>

          </nav>

          <div className="bg-green-900 px-4 py-1 rounded text-sm">
            ID: {user}
          </div>
        </div>
      </header>

      {/* TIME */}
      <p className="text-xs text-gray-400 text-center mb-6">
        Last Updated: {currentDate} {currentTime}
      </p>

      {/* HOME */}
      {activeTab === "home" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-[#0f1a0f] border border-green-900 rounded-lg p-4 text-center"
            >
              <h2 className="text-sm text-gray-400">{metric.title}</h2>
              <p className="text-lg font-bold text-green-400 mt-2">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* CHARTS */}
      {activeTab === "charts" && (
        <div className="space-y-10">

          <div className="bg-[#0f1a0f] border border-green-900 rounded-lg p-6">
            <h2 className="text-xl font-bold text-green-400 mb-4 text-center">
              Temperature Trends
            </h2>
            <div className="h-[300px]">
              <Line data={tempData} options={tempOptions} />
            </div>
          </div>

          <div className="bg-[#0f1a0f] border border-green-900 rounded-lg p-6">
            <h2 className="text-xl font-bold text-green-400 mb-4 text-center">
              Heartbeat Trends
            </h2>
            <div className="h-[300px]">
              <Line data={heartbeatData} options={heartbeatOptions} />
            </div>
          </div>

        </div>
      )}

      {/* LOCATION */}
      {activeTab === "location" && (
        <div className="bg-[#0f1a0f] border border-green-900 rounded-lg p-6">
          <h1 className="text-xl font-bold text-green-400 mb-6 text-center">
            Location Tracker
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-black border border-green-900 p-4 text-center rounded">
              <p className="text-gray-400 text-sm">Latitude</p>
              <p className="text-green-400 font-bold">{lat}</p>
            </div>

            <div className="bg-black border border-green-900 p-4 text-center rounded">
              <p className="text-gray-400 text-sm">Longitude</p>
              <p className="text-green-400 font-bold">{lng}</p>
            </div>

            <div className="bg-black border border-green-900 p-4 text-center rounded">
              <p className="text-gray-400 text-sm">Place</p>
              <p className="text-green-400">{place}</p>
            </div>
          </div>

          <div className="w-full h-[400px] rounded overflow-hidden">
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