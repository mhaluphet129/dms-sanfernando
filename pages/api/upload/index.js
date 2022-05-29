import nextConnect from "next-connect";
import multer from "multer";
import fs from "fs-extra";
import path from "path";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      let path = `./public/uploads/user/${req.body.id}/`;
      fs.mkdirsSync(path);
      cb(null, path);
    },
    filename: (req, file, cb) =>
      cb(null, "profile" + path.extname(file.originalname.toLowerCase())),
  }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("photo"));

apiRoute.post((req, res) => {
  res.status(200).json({ success: true, path: req.file.path });
});

export default apiRoute;
