import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import parse from "html-react-parser";

export default () => {
  const [qr, setQr] = useState();

  useEffect(() => {
    QRCode.toString("628b749f980808dc8f441318", function (err, url) {
      setQr(parse(url));
    });
  }, []);

  return <div style={{ width: 300 }}>{qr}</div>;
};
