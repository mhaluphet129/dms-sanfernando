import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import parse from "html-react-parser";

export default () => {
  const [qr, setQr] = useState();

  useEffect(() => {
    QRCode.toString("62800ba84bb85b93dc68f0c8", function (err, url) {
      setQr(parse(url));
    });
  }, []);

  return <div style={{ width: 300 }}>{qr}</div>;
};
