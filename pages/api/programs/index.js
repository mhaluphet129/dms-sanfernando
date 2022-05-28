import dbConnect from "../../../database/dbConnect";
import Program from "../../../database/model/Program";
import Livelihood from "../../../database/model/Livelihood";
import moment from "moment";
var ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "GET": {
      return new Promise(async (resolve, reject) => {
        const { mode } = req.query;

        if (mode == "fetch") {
          let data = await Program.find().catch((err) => {
            res.end(
              JSON.stringify({ success: false, message: "Error: " + err })
            );
          });

          res.status(200).end(
            JSON.stringify({
              success: true,
              message: "Successfully fetch the program",
              data,
            })
          );
          resolve();
        }

        if (mode == "remove") {
          const { id } = req.query;
          await Program.findOneAndDelete({ _id: id })
            .then(() => {
              res.status(200).end(
                JSON.stringify({
                  success: true,
                  message: "Successfully remove the program",
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

        if (mode == "fetch-list") {
          const { id } = req.query;
          await Livelihood.find({ programs: { $in: [ObjectId(id)] } })
            .then((data) => {
              res.status(200).end(
                JSON.stringify({
                  success: true,
                  message: "Successfully fetch the names",
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
          const { searchWord } = req.query;
          let search = {};
          if (searchWord == " ") {
            search = {};
          } else {
            var re = new RegExp(searchWord, "i");
            search = {
              $or: [{ "name.name": { $regex: re } }],
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
          resolve();
        }

        if (mode == "fetch-programs") {
          const { _id } = req.query;

          let data = await Livelihood.aggregate([
            {
              $match: {
                _id: new ObjectId(_id),
              },
            },
            {
              $unwind: "$programs",
            },
            {
              $lookup: {
                from: "programs",
                localField: "programs",
                foreignField: "_id",
                as: "programsObj",
              },
            },
            {
              $unwind: "$programsObj",
            },
            {
              $group: {
                _id: "$_id",
                programsObj: { $push: "$programsObj" },
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
              message: "Successfully fetch the names",
              data,
            })
          );
          resolve();
        }

        if (mode == "remove-to-programs") {
          const { livelihoodID, programsID } = req.query;

          await Livelihood.findOneAndUpdate(
            { _id: livelihoodID },
            {
              $pull: { programs: ObjectId(programsID) },
            }
          ).catch((err) => {
            res.end(
              JSON.stringify({ success: false, message: "Error: " + err })
            );
          });

          await Program.findOneAndUpdate(
            { _id: programsID },
            {
              $pull: { beneficiaries: ObjectId(livelihoodID) },
            }
          );

          res.status(200).end(
            JSON.stringify({
              success: true,
              message: "Removed successfully",
            })
          );
          resolve();
        }
      });
    }
    case "POST": {
      return new Promise(async (resolve, reject) => {
        const { mode } = req.body.payload;

        if (mode == "add") {
          let newProgram = Program({
            ...req.body.payload,
            createdAt: moment(),
          });

          await newProgram
            .save()
            .then(() => {
              res.status(200).end(
                JSON.stringify({
                  success: true,
                  message: "Successfully added the program",
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

        if (mode == "update") {
          const { data, id } = req.body.payload;
          await Program.findOneAndUpdate({ _id: id }, { $set: data })
            .then(() => {
              res.status(200).end(
                JSON.stringify({
                  success: true,
                  message: "Successfully updated the program",
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

        if (mode == "add-to-programs") {
          const { programID, livelihoodID, name } = req.body.payload;
          await Livelihood.findOneAndUpdate(
            { _id: livelihoodID },
            {
              $push: {
                programs: new ObjectId(programID),
                timeline: {
                  time: moment(),
                  label: `Added to Program '${name}'`,
                },
              },
            }
          )
            .then(async () => {
              await Program.findOneAndUpdate(
                { _id: programID },
                {
                  $push: {
                    beneficiaries: livelihoodID,
                  },
                }
              )
                .then(() => {
                  res.status(200).end(
                    JSON.stringify({
                      success: true,
                      message: "Successfully added to program",
                    })
                  );
                  resolve();
                })
                .catch((err) => {
                  res.end(
                    JSON.stringify({ success: false, message: "Error: " + err })
                  );
                });
            })
            .catch((err) => {
              res.end(
                JSON.stringify({ success: false, message: "Error: " + err })
              );
            });
        }
      });
    }
    default:
      res.status(400).end(JSON.stringify({ success: false }));
  }
}

// res.status(200).end(
//     JSON.stringify({
//       success: true,
//       message: "Successfully fetched the data",
//       data,
//     })
//   );
