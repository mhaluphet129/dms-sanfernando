import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Space, Typography, message } from "antd";
import io from "socket.io-client";
import Cookies from "js-cookie";
let socket;

export default ({ data, cb, genKey }) => {
  const [value, setValue] = useState("");
  const [keys, setKeys] = useState();

  const handleConnect = () => {
    if (keys.length == 0) {
      message.warn(
        "There are no running system keys. Please reload the server."
      );
      return;
    }
    let a = keys.filter((el) => el.systemID == value);
    if (a.length == 0) message.error("key not found");
    else {
      if (!a[0].connected) {
        Cookies.set("key", genKey);
        socket.emit("notify", a[0].systemID);
        socket.emit("push-new-device", {
          key: a[0].systemID,
          deviceKey: genKey,
        });

        cb();
      } else
        message.error(
          "This system key is already been connected to other devices"
        );
    }
  };

  useEffect(() => {
    fetch("/api/socketio").finally(() => {
      socket = io();

      socket.emit("get-all");
      socket.on("on-get-all", (_) => {
        setKeys(_);
      });
    });
  }, []);

  return (
    <Modal
      title='This is title and cannot be just a content but a title itself'
      visible={!data?.length}
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
