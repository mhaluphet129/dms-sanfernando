import dbConnect from "../../../database/dbConnect";
import Livelihood from "../../../database/model/Livelihood";
import Log from "../../../database/model/Log";
import Program from "../../../database/model/Program";
import Farmland from "../../../database/model/Farmland";
import jason from "../../assets/json/index";
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

          let farmlandSummary = await Farmland.aggregate([
            {
              $match: {
                location: {
                  $in: jason.barangays,
                },
              },
            },
            {
              $group: {
                _id: "$location",
                count: { $sum: 1 },
                total: { $sum: "$totalArea" },
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
          ]);

          let farmworkers = await Livelihood.aggregate([
            {
              $match: {
                "address.barangay": {
                  $in: jason.barangays,
                },
                "profile.type": { $in: ["Farmworker"] },
              },
            },
            {
              $group: {
                _id: "$address.barangay",
                count: { $sum: 1 },
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
          ]);

          let fisherfolk = await Livelihood.aggregate([
            {
              $match: {
                "address.barangay": {
                  $in: jason.barangays,
                },
                "profile.type": { $in: ["Fisherfolk"] },
              },
            },
            {
              $group: {
                _id: "$address.barangay",
                count: { $sum: 1 },
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
          ]);

          let crops = await Livelihood.aggregate([
            {
              $project: { _id: 0, "profile.crops": 1 },
            },
            {
              $unwind: "$profile.crops",
            },
            {
              $group: {
                _id: "$profile.crops",
                count: { $sum: 1 },
              },
            },
            {
              $sort: {
                count: -1,
              },
            },
          ]);

          let cropsData = [];
          crops.forEach((el, i) => {
            if (i < 3)
              cropsData.push({
                name: el._id,
                total: el.count,
              });
            else if (i == 3)
              cropsData.push({
                name: "others",
                total: 1,
              });
            else cropsData[3].total++;
          });

          let livestock = await Livelihood.aggregate([
            {
              $project: { _id: 0, "profile.livestock": 1 },
            },
            {
              $unwind: "$profile.livestock",
            },
            {
              $group: {
                _id: "$profile.livestock",
                count: { $sum: 1 },
              },
            },
            {
              $sort: {
                count: -1,
              },
            },
          ]);

          let livestockData = [];
          livestock.forEach((el, i) => {
            if (i < 3)
              livestockData.push({
                name: el._id,
                total: el.count,
              });
            else if (i == 3)
              livestockData.push({
                name: "others",
                total: 1,
              });
            else livestockData[3].total++;
          });

          let poultry = await Livelihood.aggregate([
            {
              $project: { _id: 0, "profile.poultry": 1 },
            },
            {
              $unwind: "$profile.poultry",
            },
            {
              $group: {
                _id: "$profile.poultry",
                count: { $sum: 1 },
              },
            },
            {
              $sort: {
                count: -1,
              },
            },
          ]);
          let poultryData = [];
          poultry.forEach((el, i) => {
            if (i < 3)
              poultryData.push({
                name: el._id,
                total: el.count,
              });
            else if (i == 3)
              poultryData.push({
                name: "others",
                total: 1,
              });
            else poultryData[3].total++;
          });

          let farmWorker = await Livelihood.aggregate([
            {
              $project: { _id: 0, "profile.farmWorker": 1 },
            },
            {
              $unwind: "$profile.farmWorker",
            },
            {
              $group: {
                _id: "$profile.farmWorker",
                count: { $sum: 1 },
              },
            },
            {
              $sort: {
                count: -1,
              },
            },
          ]);
          let farmworkerData = [];
          farmWorker.forEach((el, i) => {
            if (i < 3)
              farmworkerData.push({
                name: el._id,
                total: el.count,
              });
            else if (i == 3)
              farmworkerData.push({
                name: "others",
                total: 1,
              });
            else farmworkerData[3].total++;
          });

          let fishfolk = await Livelihood.aggregate([
            {
              $project: { _id: 0, "profile.fisherFolks": 1 },
            },
            {
              $unwind: "$profile.fisherFolks",
            },
            {
              $group: {
                _id: "$profile.fisherFolks",
                count: { $sum: 1 },
              },
            },
            {
              $sort: {
                count: -1,
              },
            },
          ]);
          let fisherfolkdata = [];
          fishfolk.forEach((el, i) => {
            if (i < 3)
              fisherfolkdata.push({
                name: el._id,
                total: el.count,
              });
            else if (i == 3)
              fisherfolkdata.push({
                name: "others",
                total: 1,
              });
            else fisherfolkdata[3].total++;
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
                farmlandSummary,
                cropsData,
                livestockData,
                poultryData,
                farmworkerData,
                farmworkers,
                fisherfolk,
                fisherfolkdata,
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
