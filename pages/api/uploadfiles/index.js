import nextConnect from "next-connect";
import multer from "multer";
import fs from "fs-extra";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      let path = `./public/uploads/livelihood/${req.body.id}/`;
      fs.mkdirsSync(path);
      cb(null, path);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
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

apiRoute.use(upload.array("photos"));

apiRoute.post((req, res) => {
  res.status(200).json({
    success: true,
    message: "Successfully uploaded all your files",
    files: req.files,
  });
});

export default apiRoute;
