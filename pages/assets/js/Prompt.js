import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Space, Typography, message } from "antd";
import io from "socket.io-client";
import Cookies from "js-cookie";
let socket;

export default ({ cb }) => {
  const [value, setValue] = useState("");
  const [keys, setKeys] = useState();
  const [bool, setBool] = useState(true);

  const handleConnect = () => {
    if (keys.length == 0) {
      message.warn(
        "There are no running system keys. Please reload the server."
      );
      return;
    }
    let a = keys.filter((el) => el.systemID == value);
    if (a?.length == 0) message.error("invalid key.");
    else {
      if (!a[0].connected) {
        socket.emit("notify", a[0].systemID);
        socket.emit("push-new-device", {
          key: a[0].systemID,
          deviceKey: Cookies.get("key"),
        });
        setBool(false);
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

      //checking connectivity every run
      socket.emit("check-connection", Cookies.get("key"));
      socket.on("on-checking-connection", ({ data }) => {
        if (data.length > 0) {
          setBool(false);
        }
      });

      socket.on("update-system", (_) => {
        setKeys(_);
        let a = _.filter((el) => el.deviceID == Cookies.get("key"));
        if (a.length == 0) setBool(true);
      });

      socket.emit("get-all");
      socket.on("on-get-all", (_) => {
        setKeys(_);
      });
    });
  }, []);

  useEffect(() => {
    if (keys?.length > 0) {
      let a = keys?.filter((el) => el.deviceID == Cookies.get("key"));
      if (a[0]?.deviceID == Cookies.get("key")) setBool(false);
      else setBool(true);
    }
  }, [keys]);

  return (
    <Modal
      title='This is title and cannot be just a content but a title itself'
      visible={bool}
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
