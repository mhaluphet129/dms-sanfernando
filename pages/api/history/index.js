import dbConnect from "../../../database/dbConnect";
import Visit from "../../../database/model/Visit";
import moment from "moment";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "GET": {
      return new Promise(async (resolve, reject) => {
        let data = await Visit.find({ type: "visit" }).catch((err) => {
          res.end(JSON.stringify({ success: false, message: "Error: " + err }));
        });

        let countToday = await Visit.countDocuments({
          createdAt: {
            $gte: moment().startOf("day"),
            $lte: moment(moment().startOf("day")).endOf("day").toDate(),
          },
        });

        res.status(200).end(
          JSON.stringify({
            success: true,
            message: "Successfully fetched the data",
            data,
            countToday,
          })
        );
        resolve();
      });
    }

    default:
      res.status(400).end(JSON.stringify({ success: false }));
  }
}
