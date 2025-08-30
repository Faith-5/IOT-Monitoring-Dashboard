const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

app = express();
server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" },
});

app.use(express.json());

let latestData = {};
app.post("/api/sensors", (req, res) => {
  const { gps, temperature, heartbeat, bloodVolumePulse, motion, voice } =
    req.body;

  latestData = {
    gps,
    temperature,
    heartbeat,
    bloodVolumePulse,
    motion,
    voice
  };
  io.emit("sensorUpdate", latestData);

  res.status(200).json({ data: latestData });
});

app.get("/api/sensors", (req, res) => {
  res.status(200).json(latestData);
});

// WebSocket connection
io.on("connection", (socket) => {
  console.log("Frontend connected");

  // send latest data immediately when client connects
  socket.emit("sensorUpdate", latestData);

  socket.on("disconnect", () => {
    console.log("Frontend disconnected");
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
