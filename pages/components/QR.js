import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import parse from "html-react-parser";

export default () => {
  const [qr, setQr] = useState();

  useEffect(() => {
    QRCode.toString("6281f9379bb12ddf1de6f4ed", function (err, url) {
      setQr(parse(url));
    });
  }, []);

  return <div style={{ width: 300 }}>{qr}</div>;
};
