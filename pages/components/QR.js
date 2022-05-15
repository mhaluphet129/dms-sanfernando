import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import parse from "html-react-parser";

//sample lang ni haaa
export default () => {
  const [qr, setQr] = useState();

  useEffect(() => {
    QRCode.toString("627e56949d4446e23bfd3473", function (err, url) {
      setQr(parse(url));
    });
  }, []);
  return <div style={{ width: 300 }}>{qr}</div>;
};
