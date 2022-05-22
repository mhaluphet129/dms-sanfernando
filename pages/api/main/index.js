import dbConnect from "../../../database/dbConnect";
import Livelihood from "../../../database/model/Livelihood";
import Log from "../../../database/model/Log";
import Program from "../../../database/model/Program";
import moment from "moment";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "GET": {
      return new Promise(async (resolve, reject) => {
        let { mode } = req.query;

        if (mode == "qr") {
          const { id } = req.query;
          await Livelihood.find({ _id: id })
            .then((data) => {
              res.status(200).end(
                JSON.stringify({
                  success: true,
                  message: "Successfully fetched the data",
                  data,
                })
              );
              resolve();
            })
            .catch((err) => {
              res.end(
                JSON.stringify({ success: false, message: "Error: " + err })
              );
            });
        }

        if (mode == "dashboard-data") {
          let visitToday = await Log.countDocuments({
            createdAt: {
              $gte: moment().startOf("day"),
              $lte: moment(moment().startOf("day")).endOf("day").toDate(),
            },
          });

          let totalLivelihood = await Livelihood.countDocuments();
          let totalLivelihoodToday = await Livelihood.countDocuments({
            createdAt: {
              $gte: moment().startOf("day"),
              $lte: moment(moment().startOf("day")).endOf("day").toDate(),
            },
          });

          let totalPrograms = await Program.countDocuments();
          let totalProgramsActive = await Program.countDocuments({
            status: true,
          });

          let totalFarmers = await Livelihood.countDocuments({
            "profile.type": { $in: ["Farmer"] },
          });
          let totalFarmersToday = await Livelihood.countDocuments({
            "profile.type": { $in: ["Farmer"] },
            createdAt: {
              $gte: moment().startOf("day"),
              $lte: moment(moment().startOf("day")).endOf("day").toDate(),
            },
          });

          let totalFarmworkers = await Livelihood.countDocuments({
            "profile.type": { $in: ["Farmworker"] },
          });
          let totalFarmworkersToday = await Livelihood.countDocuments({
            "profile.type": { $in: ["Farmworker"] },
            createdAt: {
              $gte: moment().startOf("day"),
              $lte: moment(moment().startOf("day")).endOf("day").toDate(),
            },
          });

          let totalFisherfolks = await Livelihood.countDocuments({
            "profile.type": { $in: ["Fisherfolk"] },
          });
          let totalFisherfolksToday = await Livelihood.countDocuments({
            "profile.type": { $in: ["Fisherfolk"] },
            createdAt: {
              $gte: moment().startOf("day"),
              $lte: moment(moment().startOf("day")).endOf("day").toDate(),
            },
          });

          res.status(200).end(
            JSON.stringify({
              success: true,
              res: {
                visitToday,
                totalLivelihood,
                totalLivelihoodToday,
                totalPrograms,
                totalProgramsActive,
                totalFarmers,
                totalFarmersToday,
                totalFarmworkers,
                totalFarmworkersToday,
                totalFisherfolks,
                totalFisherfolksToday,
              },
            })
          );
        }
      });
    }

    default:
      res.status(400).end(JSON.stringify({ success: false }));
  }
}
