import React, { useState, useEffect } from "react";
import { message } from "antd";
import parse from "html-react-parser";
import { Html5QrcodeScanner } from "html5-qrcode";

export default () => {
  function onScanError(errorMessage) {
    //handle scan error
  }

  function onScanSuccess(qrCodeMessage) {
    document.getElementById("result").innerHTML =
      '<span class="result">' + qrCodeMessage + "</span>";
    message.success("Successfully scanned!");
  }

  useEffect(() => {
    let html5QrcodeScanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 300,
    });
    html5QrcodeScanner.render(onScanSuccess, onScanError);
  }, []);

  return (
    <>
      <script src='html5-qrcode.min.js'></script>
      <style></style>
      <div class='row'>
        <div class='col'>
          <div style={{ width: 500 }} id='reader'></div>
        </div>
        <div class='col' style={{ padding: 30 }}>
          <h4>SCAN RESULT</h4>
          <div id='result'>Result Here</div>
        </div>
      </div>
    </>
  );
};
