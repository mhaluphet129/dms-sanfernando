import { Server } from "Socket.IO";

/* Lets do the channeling */

let socketsData = [];

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on("connection", (socket) => {
      // JS for LIFE

      /*
      //==============/================/===================/==================//
        WEBSOCKETS handles end to end communications without pulling an API 
        to listen every listeners okay ?
      //===============/================/===================/=================//

      /* System and Device push channels */
      socket.on("push-new-system", (key) => {
        socketsData.push({ systemID: key, deviceID: null, connected: false });
      });
      socket.on("push-new-device", ({ key, deviceKey }) => {
        socketsData.forEach((el) => {
          if (el.systemID == key) {
            el.deviceID = deviceKey;
            el.connected = true;
          }
        });
        socket.broadcast.emit(
          "connected-to-system",
          key,
          socketsData.filter((el) => el.systemID == key)
        );
      });

      /* Remove system and Device handlers */
      socket.on("remove-system", (key) => {
        socketsData = socketsData.filter((el) => el.systemID != key);
      });
      socket.on("remove-device", ({ deviceID }) => {
        socketsData.forEach((el) => {
          if (el.deviceID == deviceID) {
            el.deviceID == null;
            el.connected = false;
          }
        });
        socket.emit(
          "on-remove-device",
          socketsData.filter((el) => el.deviceID == deviceID)
        );
      });

      /* Getter */
      socket.on("get-all", () => {
        socket.emit("on-get-all", socketsData);
        console.log(socketsData);
      });
      socket.on("get-key", ({ systemID, deviceID }) => {
        let key = systemID
          ? socketsData.filter((el) => el.systemID == systemID)
          : socketsData.filter((el) => el.deviceID == deviceID);
        socket.emit("on-get-key", key);
      });

      /* Notify user when connected */
      socket.on("notify", (key) => {
        socket.broadcast.emit("push-notify", key);

        // let _key = keyPairs.filter((el) => el.systemKey == key);
        // socket.broadcast.emit("get-key", _key);
      });
      socket.on("open-profile", ({ id, key }) => {
        socket.broadcast.emit("on-open-profile", {
          data: socketsData.filter((el) => el.deviceID == key),
          id,
        });
      });

      /* CONNECTION handler ( connect/disconnect ) */
      socket.on("connect", (deviceID) => {
        socketsData.forEach((el) => {
          if (el.deviceID == deviceID) el.connected = true;
        });
        socket.emit("update-connection", true);
      });
      socket.on("disconnect", (deviceID) => {
        socketsData.forEach((el) => {
          if (el.deviceID == deviceID) el.connected = false;
        });
        socket.emit("update-connection", false);
      });
    });
  }
  res.end();
};

export default SocketHandler;
