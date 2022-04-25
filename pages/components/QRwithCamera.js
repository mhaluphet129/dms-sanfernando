import React, { useState, useEffect } from "react";
import { Typography, Card, Tag, Button, message } from "antd";
import { Html5QrcodeScanner } from "html5-qrcode";
import io from "socket.io-client";
import { keyGenerator } from "../assets/js/KeyGenerator";

import Prompt from "../assets/js/Prompt";
let socket;

export default ({ setIsConnected, isConnected }) => {
  const [keys, setKeys] = useState([]);

  function onScanError(errorMessage) {}
  function onScanSuccess(qrCodeMessage) {
    message.success("Successfully scanned!");
  }

  useEffect(() => {
    let html5QrcodeScanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 300,
    });
    html5QrcodeScanner.render(onScanSuccess, onScanError);
  }, []);

  useEffect(() => {
    fetch("/api/socketio").finally(() => {
      socket = io();

      socket.on("update-connection", (_keys) => {
        setKeys(_keys);
      });
    });
  }, []);

  return (
    <>
      <Prompt
        setIsConnected={setIsConnected}
        isConnected={isConnected}
        setKeys={setKeys}
        keys={keys}
      />
      <div class='row'>
        <div class='col'>
          <div style={{ width: 500 }} id='reader'></div>
          <Card
            title='Device connection Information'
            extra={[
              <Button
                danger={keys[0]?.deviceId ? true : false}
                onClick={() => {
                  socket.emit("disconnect-connection", keys[0].deviceId);
                }}
              >
                {keys[0]?.deviceId ? "DISCONNECT" : "CONNECT"}
              </Button>,
            ]}
            hoverable
          >
            <Typography.Text>
              Connection status:{" "}
              {keys[0]?.deviceId ? (
                <Tag color='success'>Connected</Tag>
              ) : (
                <Tag color='error'>Not Connected</Tag>
              )}
            </Typography.Text>
            <Typography.Text>
              <br />
              System key:{" "}
              <Typography.Text type='secondary'>
                {keys[0]?.systemKey ? keys[0]?.systemKey : "null"}
              </Typography.Text>
            </Typography.Text>
            <br />
            <Typography.Text>
              Device Id:{" "}
              <Typography.Text type='secondary'>
                {keys[0]?.deviceId ? keys[0]?.deviceId : "null"}
              </Typography.Text>
            </Typography.Text>
            <br />
          </Card>
        </div>
      </div>
    </>
  );
};
