import { useState, useEffect } from "react";
import QRCode from "qrcode";
import parse from "html-react-parser";

//sample lang ni haaa
export default () => {
  const [qr, setQr] = useState();

  useEffect(() => {
    QRCode.toString("I am a pony!", function (err, url) {
      setQr(parse(url));
    });
  }, []);
  return <>{qr}</>;
};
