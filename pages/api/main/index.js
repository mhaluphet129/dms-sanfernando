import dbConnect from "../../../database/dbConnect";
import Livelihood from "../../../database/model/Livelihood";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "GET": {
      return new Promise(async (resolve, reject) => {
        let { id } = req.query;
        await Livelihood.find({ _id: id })
          .then((data) => {
            res.status(200).end(
              JSON.stringify({
                success: true,
                message: "Successfully fetched the data",
                data,
              })
            );
          })
          .catch((err) => {
            res.end(
              JSON.stringify({ success: false, message: "Error: " + err })
            );
          });
      });
    }

    default:
      res.status(400).end(JSON.stringify({ success: false }));
  }
}
