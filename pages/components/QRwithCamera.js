import React, { useState, useEffect } from "react";
import { Typography, Card, Tag, Button, message } from "antd";
import { Html5QrcodeScanner } from "html5-qrcode";
import io from "socket.io-client";
import Cookie from "js-cookie";

import Prompt from "../assets/js/Prompt";
let socket;

export default ({ setIsConnected, isConnected }) => {
  const [keyData, setKeyData] = useState();
  useEffect(() => {
    let html5QrcodeScanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 300,
    });
    html5QrcodeScanner.render((success) => {
      message.success("Successfully scanned!");
      socket.emit("open-profile", {
        id: success,
        key: Cookie.get("key"),
      });
    });
  }, []);

  useEffect(() => {
    fetch("/api/socketio").finally(() => {
      socket = io();

      socket.emit("get-key", { deviceID: Cookie.get("key") });
      socket.on("on-get-key", (_key) => {
        if (!_key) message.error("Error in server sockets");
        else setKeyData(_key);
      });

      socket.on("on-remove-device", ({ key, updatedKey }) => {
        if (Cookie.get("key") == key) {
          setKeyData(updatedKey);
          setIsConnected(false);
        }
      });

      socket.emit("remove-device", { deviceID: Cookie.get("key") });

      // socket.on("update-connection", (status) => {
      // setConnectionText(!status ? "DISCONNECT" : "CONNECT");
      // });
    });
  }, []);

  return (
    <>
      <Prompt
        setIsConnected={setIsConnected}
        isConnected={keyData && keyData[0].deviceID != null}
        cb={() => socket.emit("get-key", { deviceID: Cookie.get("key") })}
      />
      <div class='row'>
        <div class='col'>
          <div style={{ width: "100%" }} id='reader'></div>
          <Card
            title='Device status Information'
            extra={[
              <Button
                danger={!isConnected ? true : false}
                onClick={() => {
                  // if (isConnected) socket.emit("disconnect", Cookie.get("key"));
                  // else socket.emit("connect", Cookie.get("key"));
                  alert(keyData && keyData[0].deviceID != null);
                }}
              >
                {isConnected ? "DISCONNECT" : "CONNECT"}
              </Button>,
            ]}
            hoverable
          >
            <Typography.Text>
              Connection status:{" "}
              <Tag color={isConnected ? "success" : "error"}>
                {isConnected ? "Connected" : "Not Connected"}
              </Tag>
            </Typography.Text>
            <Typography.Text>
              <br />
              System key:{" "}
              <Typography.Text type='secondary'>
                {keyData?.length > 0 ? keyData[0].systemID : "null"}
              </Typography.Text>
            </Typography.Text>
            <br />
            <Typography.Text>
              Device Id:{" "}
              <Typography.Text type='secondary'>
                {keyData?.length > 0 ? keyData[0].deviceID : ""}
              </Typography.Text>
            </Typography.Text>
            <br />
          </Card>
        </div>
      </div>
    </>
  );
};
