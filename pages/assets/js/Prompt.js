import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Space, message } from "antd";
import io from "socket.io-client";
import Cookies from "js-cookie";
import { keyGenerator } from "../js/KeyGenerator";
let socket;

export default ({ setIsConnected, isConnected, setKeys, keys }) => {
  const [value, setValue] = useState("");

  const handleConnect = () => {
    let a = keys.filter((el) => el.systemKey == value);
    if (a.length == 0) message.error("key not found");
    else {
      let _key = keyGenerator(6);
      setIsConnected(true);
      socket.emit("notify", a[0].systemKey);
      socket.emit("push-new-device-key", {
        key: a[0].systemKey,
        deviceKey: _key,
      });
      Cookies.set("key", _key);
    }
  };

  useEffect(() => {
    fetch("/api/socketio").finally(() => {
      socket = io();

      socket.emit("get-all-keys");
      socket.on("get-keys", (_keys) => {
        setKeys(_keys);
      });
    });
  }, []);

  return (
    <Modal
      title='Enter a key'
      visible={isConnected}
      footer={null}
      closable={false}
    >
      <Space>
        <Input
          maxLength={5}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          allowClear
        />
        <Button
          style={{ backgroundColor: "#4CAF50", color: "#fff" }}
          onClick={handleConnect}
        >
          Connect
        </Button>
      </Space>
    </Modal>
  );
};
