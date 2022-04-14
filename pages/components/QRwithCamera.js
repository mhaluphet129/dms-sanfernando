import React, { useState, useEffect } from "react";
import { message } from "antd";
import { Html5QrcodeScanner } from "html5-qrcode";
import io from "socket.io-client";

export default () => {
  let socket;
  function onScanError(errorMessage) {}

  function onScanSuccess(qrCodeMessage) {
    message.success("Successfully scanned!");
    socket.emit("hello", qrCodeMessage);
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
    });
  }, []);

  return (
    <>
      <style></style>
      <div class='row'>
        <div class='col'>
          <div style={{ width: 500 }} id='reader'></div>
        </div>
      </div>
    </>
  );
};
