import "./App.css";
import useSensorData from "./hooks/useSensorHook";

function App() {
  const data = useSensorData();

  return (
    <div style={{ padding: "20px" }}>
      <h1>IoT Monitoring Dashboard</h1>
      {data ? (
        <>
          <p>
            <b>GPS:</b> {data.gps}
          </p>
          <p>
            <b>Temperature:</b> {data.temperature} °C
          </p>
          <p>
            <b>Heartbeat:</b> {data.heartbeat} bpm
          </p>
          <p>
            <b>Blood Volume Pulse:</b> {data.bloodVolumePulse}%
          </p>
          <p>
            <b>Motion:</b> {data.motion}
          </p>
          <p>
            <b>Voice:</b> {data.voice}
          </p>
        </>
      ) : (
        <p>Waiting for data...</p>
      )}
    </div>
  );
}

export default App;
