import "./App.css";
import useSensorData from "./hooks/useSensorHook";
import useSensorCharts from "./hooks/useSensorCharts";
import ReactDOM from "react-dom/client";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const data = useSensorData();
  const { tempData, heartbeatData, tempOptions, heartbeatOptions } =
    useSensorCharts();
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
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-600">
        IoT Monitoring Dashboard
      </h1>

      {/* Last updated text */}
      <p className="text-sm text-gray-500 text-center mt-1 mb-8">
        Last Updated: {currentDate} {currentTime}
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="p-4 text-center">
              {/* Title */}
              <h2 className="text-lg font-bold text-gray-700 mb-2">
                {metric.title}
              </h2>

              {/* Value */}
              <p className="text-lg font-medium text-blue-600">
                {metric.value}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          marginTop: "27px",
        }}
      >
        <div style={{ flex: "1 1 300px", height: "300px" }}>
          <Line data={tempData} options={tempOptions} />
        </div>
        <div style={{ flex: "1 1 300px", height: "300px" }}>
          <Line data={heartbeatData} options={heartbeatOptions} />
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

export default App;