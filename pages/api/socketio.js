import { Server } from "Socket.IO";
import {
  getAll,
  get,
  pushNewSystem,
  pushNewDevice,
  removeSystem,
  removeDevice,
} from "../assets/js/Channel";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on("connection", (socket) => {
      // JS for LIFE

      /* =============/================/===================/==================//
        WEBSOCKETS handles end to end communications without pulling an API 
        to listen every listeners okay ?
      //===============/================/===================/================= */

      /* System and Device push channels */
      socket.on("push-new-system", (key) => {
        pushNewSystem({ systemID: key, deviceID: null, connected: false });
      });
      socket.on("push-new-device", ({ key, deviceKey }) => {
        pushNewDevice({ systemID: key, deviceID: deviceKey, connected: true });
        socket.broadcast.emit("connected-to-system", key, deviceKey);
      });

      /* Remove system and Device handlers */
      socket.on("remove-system", (key) => {
        removeSystem({ systemID: key });
      });
      socket.on("remove-device", (key) => {
        removeDevice({ systemID: key });
      });

      /* Getter */
      socket.on("get-all", () => {
        socket.emit("on-get-all", getAll());
      });
      socket.on("get-key", ({ systemID, deviceID }) => {
        let key = get({ systemID, deviceID });
        socket.emit("on-get-key", key);
      });

      /* Notify user when connected */
      socket.on("notify", (key) => {
        socket.broadcast.emit("push-notify", key);

        // let _key = keyPairs.filter((el) => el.systemKey == key);
        // socket.broadcast.emit("get-key", _key);
      });

      /* CONNECTION handler ( connect/disconnect ) */
      socket.on("connect", (deviceID) => {
        getAll().forEach((el) => {
          if (el.deviceID == deviceID) el.connected = true;
        });
        socket.emit("update-connection", true);
      });
      socket.on("disconnect", (deviceID) => {
        getAll().forEach((el) => {
          if (el.deviceID == deviceID) el.connected = false;
        });
        socket.emit("update-connection", false);
      });
    });
  }
  res.end();
};

export default SocketHandler;
