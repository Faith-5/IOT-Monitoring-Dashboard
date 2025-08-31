import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL);

export default function useSensorCharts() {
  const [data, setData] = useState(null);
  const [tempData, setTempData] = useState({
    labels: [],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [],
        borderColor: "teal",
        backgroundColor: "lightblue",
      },
    ],
  });

  const [heartbeatData, setHeartbeatData] = useState({
    labels: [],
    datasets: [
      {
        label: "Heartbeat (bpm)",
        data: [],
        borderColor: "red",
        backgroundColor: "pink",
      },
    ],
  });

  useEffect(() => {
    socket.on("iot-data", (packet) => {
      setData(packet);
      const time = new Date().toLocaleTimeString();

      // update temp chart
      setTempData((prev) => ({
        ...prev,
        labels: [...prev.labels, time].slice(-10),
        datasets: [
          {
            ...prev.datasets[0],
            data: [...prev.datasets[0].data, Number(data.temperature)].slice(-10),
          },
        ],
      }));

      // update heartbeat chart
      setHeartbeatData((prev) => ({
        ...prev,
        labels: [...prev.labels, time].slice(-10),
        datasets: [
          {
            ...prev.datasets[0],
            data: [...prev.datasets[0].data, Number(data.heartbeat)].slice(-10),
          },
        ],
      }));
    });

    return () => {
      socket.off("iot-data");
    };
  }, []);

  const tempOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { title: { display: true, text: "Temperature (°C)" } },
      x: { title: { display: true, text: "Time" } },
    },
  };

  const heartbeatOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { title: { display: true, text: "Heartbeat (bpm)" } },
      x: { title: { display: true, text: "Time" } },
    },
  };

  return { tempData, heartbeatData, tempOptions, heartbeatOptions };
}
