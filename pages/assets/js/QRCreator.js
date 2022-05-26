import QRCode from "qrcode";
import parse from "html-react-parser";

export default (data) => {
  QRCode.toString(data, function (err, url) {
    console.log(url);
    return parse(url);
  });
};
