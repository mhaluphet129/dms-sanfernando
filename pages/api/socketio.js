import { Server } from "Socket.IO";

<<<<<<< HEAD
let keyPairs = []; // for user unique key
=======
>>>>>>> 62dd386 (added websockets for logs)
const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on("connection", (socket) => {
<<<<<<< HEAD
      // key stuffs
      socket.on("push-new-system-key", (key) => {
        keyPairs.push({ systemKey: key, deviceId: null });
      });

      socket.on("remove-system-key", (key) => {
        keyPairs = keyPairs.filter((el) => el.systemKey != key);
      });
      socket.on("get-all-keys", () => {
        socket.emit("get-keys", keyPairs);
      });
      socket.on("get-keys", (_key) => {
        let key = keyPairs.filter((el) => el.systemKey == _key);
        socket.emit("get-key", key);
      });

      /* photo to web sockets */
      socket.on("notify", (key) => {
        socket.broadcast.emit("push-notify", key);

        let _key = keyPairs.filter((el) => el.systemKey == key);
        socket.broadcast.emit("get-key", _key);
      });
      /* connect */
      socket.on("push-new-device-key", ({ key, deviceKey }) => {
        keyPairs.forEach((el) => {
          if (el?.systemKey == key) el.deviceId = deviceKey;
        });
      });
      /* disconnect */
      socket.on("disconnect-connection", (id) => {
        keyPairs.forEach((el) => {
          if (el?.deviceId == id) el.deviceId = null;
        });
        socket.broadcast.emit("update-connection", keyPairs);
        let _key = keyPairs.filter((el) => el.deviceId == id);
        socket.broadcast.emit("get-key", _key);
=======
      socket.on("hello", (msg) => {
        socket.broadcast.emit("alert", msg);
      });
      socket.on("input-change", (msg) => {
        socket.broadcast.emit("update-input", msg);
>>>>>>> 62dd386 (added websockets for logs)
      });
    });
  }
  res.end();
};

export default SocketHandler;
