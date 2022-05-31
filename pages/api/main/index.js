import dbConnect from "../../../database/dbConnect";
import Livelihood from "../../../database/model/Livelihood";
import Log from "../../../database/model/Log";
import Program from "../../../database/model/Program";
import Farmland from "../../../database/model/Farmland";
import jason from "../../assets/json/index";

var ObjectId = require("mongodb").ObjectId;
import moment from "moment";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "GET": {
      return new Promise(async (resolve, reject) => {
        let { mode } = req.query;

        if (mode == "analysis") {
          const { name, middlename, lastname } = req.query;

          try {
            let mainNameOccurence = await Livelihood.countDocuments({
              "name.name": name,
            });
            let mainMiddlenameOccurence = await Livelihood.countDocuments({
              "name.middleName": middlename,
            });
            let mainLastnameOccurence = await Livelihood.countDocuments({
              "name.lastName": lastname,
            });
            let totalMain = await Livelihood.countDocuments();

            let spouseNameOccurence = await Livelihood.countDocuments({
              "spouse.name": name,
            });
            let spouseMiddlenameOccurence = await Livelihood.countDocuments({
              "spouse.middleName": middlename,
            });
            let spouseLastnameOccurence = await Livelihood.countDocuments({
              "spouse.lastName": lastname,
            });
            let exactMainOccurence = await Livelihood.countDocuments({
              "name.name": name,
              "name.middleName": middlename,
              "name.lastName": lastname,
            });
            let exactSpouseOccurence = await Livelihood.countDocuments({
              "spouse.name": name,
              "spouse.middleName": middlename,
              "spouse.lastName": lastname,
            });
            let totalSpouse = await Livelihood.countDocuments({
              "spouse.name": { $ne: "" },
              "spouse.name": { $ne: undefined },
            });

            res.status(200).end(
              JSON.stringify({
                success: true,
                analysis: {
                  main: {
                    name: mainNameOccurence,
                    middlename: mainMiddlenameOccurence,
                    lastname: mainLastnameOccurence,
                    exact: exactMainOccurence,
                    total: totalMain,
                  },
                  spouse: {
                    name: spouseNameOccurence,
                    middlename: spouseMiddlenameOccurence,
                    lastname: spouseLastnameOccurence,
                    exact: exactSpouseOccurence,
                    total: totalSpouse,
                  },
                },
              })
            );
            resolve();
          } catch {
            res.end(
              JSON.stringify({ success: false, message: "Error: " + err })
            );
          }
        }
        if (mode == "get-total") {
          try {
            let farmer = await Livelihood.countDocuments({
              "profile.type": { $in: ["Farmer"] },
              isActive: true,
            });
            let farmworker = await Livelihood.countDocuments({
              "profile.type": { $in: ["Farmworker"] },
              isActive: true,
            });
            let fisherfolk = await Livelihood.countDocuments({
              "profile.type": { $in: ["Fisherfolk"] },
              isActive: true,
            });
            res.status(200).end(
              JSON.stringify({
                success: true,
                data: { farmer, farmworker, fisherfolk },
              })
            );
            resolve();
          } catch {
            res.end(
              JSON.stringify({ success: false, message: "Error: " + err })
            );
          }
        }

        if (mode == "get-specific") {
          const { name } = req.query;

          try {
            let data = await Livelihood.find({
              "profile.type": { $in: [name] },
              isActive: true,
            });
            res.status(200).end(
              JSON.stringify({
                success: true,
                data,
              })
            );
            resolve();
          } catch {
            res.end(
              JSON.stringify({ success: false, message: "Error: " + err })
            );
          }
        }

        if (mode == "qr") {
          const { id } = req.query;
          let _ = await Livelihood.aggregate([
            {
              $match: {
                _id: ObjectId(id),
              },
            },
            {
              $lookup: {
                from: "farmlands",
                let: { farmlandID: "$farmlandID" },
                pipeline: [
                  { $match: { $expr: { $in: ["$_id", "$$farmlandID"] } } },
                ],
                as: "farmobj",
              },
            },
          ]).catch((err) => {
            res.end(
              JSON.stringify({ success: false, message: "Error: " + err })
            );
          });
          res.status(200).end(
            JSON.stringify({
              success: true,
              message: "Successfully fetched the data",
              data: _,
            })
          );
          resolve();
        }

        if (mode == "get-program") {
          const { id } = req.query;
          await Program.find({ _id: id })
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

        if (mode == "fetch-search") {
          let { searchWord, pattern } = req.query;
          //pattern program, brgy

          searchWord = searchWord.replace(`${pattern}:`, "");
          let search = {};
          if (searchWord == " ") {
            search = {};
          } else {
            if (pattern == "program") {
              var re = new RegExp(searchWord.trim(), "i");
              search = {
                $or: [{ name: { $regex: re } }],
              };
              let data = await Program.find({
                $and: [search],
              })
                .collation({ locale: "en" })
                .sort({ name: 1 })
                .catch((err) => {
                  res.end(
                    JSON.stringify({ success: false, message: "Error: " + err })
                  );
                });

              res.status(200).end(
                JSON.stringify({
                  success: true,
                  data,
                })
              );
            } else if (pattern == "brgy") {
              var re = new RegExp(searchWord.trim(), "i");
              search = {
                $or: [{ "address.barangay": { $regex: re } }],
              };

              let data = await Program.find({
                $and: [search],
              })
                .collation({ locale: "en" })
                .sort({ "address.barangay": 1 })
                .catch((err) => {
                  res.end(
                    JSON.stringify({ success: false, message: "Error: " + err })
                  );
                });

              res.status(200).end(
                JSON.stringify({
                  success: true,
                  data,
                })
              );
            } else {
              var re = new RegExp(searchWord.trim(), "i");
              search = {
                $or: [
                  { "name.name": { $regex: re } },
                  { "name.lastName": { $regex: re } },
                ],
              };
            }

            let data = await Livelihood.find({
              $and: [search, { isActive: true }],
            })
              .collation({ locale: "en" })
              .sort({ "name.name": 1 })
              .catch((err) => {
                res.end(
                  JSON.stringify({ success: false, message: "Error: " + err })
                );
              });

            res.status(200).end(
              JSON.stringify({
                success: true,
                data,
              })
            );
          }
          resolve();
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
                total: -1,
              },
            },
          ]);

          let bar = await Livelihood.aggregate([
            {
              $match: {
                "address.barangay": {
                  $in: jason.barangays,
                },
              },
            },
            {
              $project: {
                _id: 0,
                "profile.type": 1,
                "address.barangay": 1,
              },
            },
            {
              $unwind: "$profile.type",
            },
            {
              $group: {
                _id: "$profile.type",
                barangay: {
                  $push: "$address.barangay",
                },
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
              $match: {
                "profile.type": { $in: ["Farmer"] },
              },
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
          let cropsData = {};
          if (crops.length > 3) cropsData.others = 0;
          crops.forEach((el, i) => {
            if (i < 3) cropsData[el._id] = el.count;
            else cropsData.others++;
          });

          let livestock = await Livelihood.aggregate([
            {
              $match: {
                "profile.type": { $in: ["Farmer"] },
              },
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
          let livestockData = {};
          if (livestock.length > 3) livestockData.others = 0;
          livestock.forEach((el, i) => {
            if (i < 3) livestockData[el._id] = el.count;
            else livestockData.others++;
          });

          let poultry = await Livelihood.aggregate([
            {
              $match: {
                "profile.type": { $in: ["Farmer"] },
              },
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
          let poultryData = {};
          if (poultry.length > 3) poultryData.others = 0;
          poultry.forEach((el, i) => {
            if (i < 3) poultryData[el._id] = el.count;
            else poultryData.others++;
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
                farmworkers,
                fisherfolk,
                fisherfolkdata,
                bar,
                farmlandSummary,
                cropsData,
                livestockData,
                poultryData,
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
