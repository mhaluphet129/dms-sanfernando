import React, { useState, useEffect } from "react";
import { Typography, Card, Tag, Button, message } from "antd";
import { Html5QrcodeScanner } from "html5-qrcode";
import io from "socket.io-client";
import Cookie from "js-cookie";

import Prompt from "../assets/js/Prompt";
import keyGenerator from "../assets/js/KeyGenerator";
let socket;

export default () => {
  const [keyData, setKeyData] = useState();
  const [genKey, setGenKey] = useState();

  useEffect(() => {
    let key = Cookie.get("key") || keyGenerator(6);
    if (!Cookie.get("key")) Cookie.set("key", key);
    setGenKey(key);
    let html5QrcodeScanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 300,
    });

    html5QrcodeScanner.render((success) => {
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

      socket.on("on-remove-device", ({ key, data }) => {
        if (Cookie.get("key") == key) setKeyData(data);
      });

      socket.on("update-connection", ({ data }) => {
        if (data.length > 0 && data[0].deviceID == Cookies.get("key"))
          setKeyData(data);
      });
    });
  }, []);

  return (
    <>
      <Prompt cb={() => socket.emit("get-key", { deviceID: genKey })} />
      <div class='row'>
        <div class='col'>
          <div style={{ width: "100%" }} id='reader'></div>
          <Card
            title='Device status Information'
            extra={[
              <Button
                danger={
                  keyData?.length > 0 && keyData[0]?.connected ? true : false
                }
                onClick={() => {
                  if (keyData?.length > 0 && keyData[0]?.connected)
                    socket.emit("disconnect-system", Cookie.get("key"));
                  else socket.emit("connect-system", Cookie.get("key"));
                }}
              >
                {keyData?.length > 0 && keyData[0]?.connected
                  ? "DISCONNECT"
                  : "CONNECT"}
              </Button>,
            ]}
            hoverable
          >
            <Typography.Text>
              Connection status:{" "}
              <Tag
                color={
                  keyData?.length > 0 && keyData[0]?.connected
                    ? "success"
                    : "error"
                }
              >
                {keyData?.length > 0 && keyData[0]?.connected
                  ? "Connected"
                  : "Not Connected"}
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
                {keyData?.length > 0 ? keyData[0]?.deviceID : "null"}
              </Typography.Text>
            </Typography.Text>
            <br />
          </Card>
        </div>
      </div>
    </>
  );
};
