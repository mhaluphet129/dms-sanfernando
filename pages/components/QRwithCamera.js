import React, { useState, useEffect } from "react";
import { Typography, Card, Tag, Button, message } from "antd";
import { Html5QrcodeScanner } from "html5-qrcode";
import io from "socket.io-client";
import { keyGenerator } from "../assets/js/KeyGenerator";

import Prompt from "../assets/js/Prompt";
let socket;

export default ({ setIsConnected, isConnected }) => {
  const [connectionText, setConnectionText] = useState(
    keys[0]?.deviceId ? "DISCONNECT" : "CONNECT"
  );

  useEffect(() => {
    let html5QrcodeScanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 300,
    });
    html5QrcodeScanner.render(() => {
      message.success("Successfully scanned!");
    });
  }, []);

  useEffect(() => {
    fetch("/api/socketio").finally(() => {
      socket = io();

      socket.on("update-connection", (status) => {
        setConnectionText(!status ? "DISCONNECT" : "CONNECT");
      });
    });
  }, []);

  return (
    <>
      <Prompt setIsConnected={setIsConnected} isConnected={isConnected} />
      <div class='row'>
        <div class='col'>
          <div style={{ width: 500 }} id='reader'></div>
          <Card
            title='Device connection Information'
            extra={[
              <Button
                danger={keys[0]?.deviceId ? true : false}
                onClick={() => {
                  if (connectionText == "CONNECT")
                    socket.emit("disconnect", keys[0].deviceId);
                  else socket.emit("connect", keys[0].deviceId);
                }}
              >
                {connectionText}
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
