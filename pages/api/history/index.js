import dbConnect from "../../../database/dbConnect";
import Log from "../../../database/model/Log";
import moment from "moment";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "GET": {
      return new Promise(async (resolve, reject) => {
        const { type } = req.query;
        let data = await Log.find({ type })
          .sort({ $natural: -1 })
          .catch((err) => {
            res.end(
              JSON.stringify({ success: false, message: "Error: " + err })
            );
          });

        let countToday = await Log.countDocuments({
          createdAt: {
            $gte: moment().startOf("day"),
            $lte: moment(moment().startOf("day")).endOf("day").toDate(),
          },
          type,
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
