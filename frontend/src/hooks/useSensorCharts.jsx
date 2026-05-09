import { useState, useEffect, useMemo } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL);

export default function useSensorCharts() {
  const [tempData, setTempData] = useState({
    labels: [],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [],
        borderColor: "#4ade80",
        backgroundColor: "rgba(74, 222, 128, 0.1)",
      },
    ],
  });

  const [heartbeatData, setHeartbeatData] = useState({
    labels: [],
    datasets: [
      {
        label: "Heartbeat (bpm)",
        data: [],
        borderColor: "#f87171",
        backgroundColor: "rgba(248, 113, 113, 0.1)",
      },
    ],
  });

  useEffect(() => {
    const handleSensorUpdate = (packet) => {
      const time = new Date().toLocaleTimeString();

      setTempData((prev) => ({
        ...prev,
        labels: [...prev.labels, time].slice(-10),
        datasets: [
          {
            ...prev.datasets[0],
            data: [
              ...prev.datasets[0].data,
              Number(packet.temperature),
            ].slice(-10),
          },
        ],
      }));

      setHeartbeatData((prev) => ({
        ...prev,
        labels: [...prev.labels, time].slice(-10),
        datasets: [
          {
            ...prev.datasets[0],
            data: [
              ...prev.datasets[0].data,
              Number(packet.heartbeat),
            ].slice(-10),
          },
        ],
      }));
    };

    socket.on("sensorUpdate", handleSensorUpdate);

    return () => {
      socket.off("sensorUpdate", handleSensorUpdate);
    };
  }, []);

  // ✅ Stable options (prevents re-render issues)
  const tempOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    scales: {
      y: {
        title: { display: true, text: "Temperature (°C)" },
      },
      x: {
        title: { display: true, text: "Time" },
      },
    },
  }), []);

  const heartbeatOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    scales: {
      y: {
        title: { display: true, text: "Heartbeat (bpm)" },
      },
      x: {
        title: { display: true, text: "Time" },
      },
    },
  }), []);

  return { tempData, heartbeatData, tempOptions, heartbeatOptions };
}