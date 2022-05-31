import dbConnect from "../../../database/dbConnect";
import Livelihood from "../../../database/model/Livelihood";
import Log from "../../../database/model/Log";
import Farmland from "../../../database/model/Farmland";
import moment from "moment";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "GET": {
      return new Promise(async (resolve, reject) => {
        let { mode } = req.query;

        if (mode == "fetch-commodity-report-data") {
          const { brgy, commodity, commodityType } = req.query;

          let query = [
            {
              $unwind: "$crops",
            },
            {
              $project: {
                crops: 1,
                _id: 0,
                totalArea: 1,
              },
            },
            {
              $group: {
                _id: "$crops.crop",
                qty: { $push: "$totalArea" },
                unit: { $push: "$crops.unit" },
                type: { $push: "$crops.farmtype" },
              },
            },
            {
              $project: {
                _id: 1,
                data: {
                  $zip: {
                    inputs: ["$type", "$qty", "$unit"],
                  },
                },
              },
            },
            {
              $unwind: "$data",
            },
            {
              $sort: {
                _id: 1,
              },
            },
          ];

          if (brgy != "all" && commodity != "all" && commodityType != "all") {
            query.unshift(
              ...[
                {
                  $match: {
                    crops: {
                      $elemMatch: {
                        farmtype: commodityType,
                        crop: commodity,
                      },
                    },
                    location: brgy,
                  },
                },
              ]
            );
          } else if (
            commodity == "all" &&
            commodityType == "all" &&
            brgy == "all"
          ) {
            query.unshift(
              ...[
                {
                  $group: {
                    _id: null,
                    data: { $push: "$$ROOT" },
                  },
                },
                {
                  $unwind: "$data",
                },
                {
                  $replaceRoot: {
                    newRoot: "$data",
                  },
                },
              ]
            );
          } else if (
            brgy != "all" &&
            commodity == "all" &&
            commodityType == "all"
          ) {
            query.unshift(
              ...[
                {
                  $match: {
                    location: brgy,
                  },
                },
              ]
            );
          } else if (
            brgy != "all" &&
            commodity != "all" &&
            commodityType == "all"
          ) {
            query.unshift(
              ...[
                {
                  $match: {
                    crops: {
                      $elemMatch: {
                        crop: commodity,
                      },
                    },
                    location: brgy,
                  },
                },
              ]
            );
          } else if (
            brgy == "all" &&
            commodity != "all" &&
            commodityType != "all"
          ) {
            query.unshift(
              ...[
                {
                  $match: {
                    crops: {
                      $elemMatch: {
                        farmtype: commodityType,
                        crop: commodity,
                      },
                    },
                  },
                },
              ]
            );
          } else if (
            brgy == "all" &&
            commodity == "all" &&
            commodityType != "all"
          ) {
            query.unshift(
              ...[
                {
                  $match: {
                    crops: {
                      $elemMatch: {
                        farmtype: commodityType,
                      },
                    },
                  },
                },
              ]
            );
          } else if (
            brgy == "all" &&
            commodity != "all" &&
            commodityType == "all"
          ) {
            query.unshift(
              ...[
                {
                  $match: {
                    crops: {
                      $elemMatch: {
                        crop: commodity,
                      },
                    },
                  },
                },
              ]
            );
          } else if (
            brgy != "all" &&
            commodity == "all" &&
            commodityType != "all"
          ) {
            query.unshift(
              ...[
                {
                  $match: {
                    crops: {
                      $elemMatch: {
                        farmtype: commodityType,
                      },
                    },
                    location: brgy,
                  },
                },
              ]
            );
          }

          let farmlands = await Farmland.aggregate(query).catch((err) => {
            res.end(
              JSON.stringify({ success: false, message: "Error: " + err })
            );
          });
          // brgy, commodity, commodityType
          if (commodity != "all")
            farmlands = farmlands.filter((el) => el._id == commodity);
          if (commodityType != "all")
            farmlands = farmlands.filter((el) => el.data[0] == commodityType);
          res.status(200).end(
            JSON.stringify({
              success: true,
              data: farmlands,
            })
          );
          resolve();
        }

        if (mode == "get-commodity") {
          let a = await Farmland.aggregate([
            {
              $group: {
                _id: null,
                data: { $push: "$$ROOT" },
              },
            },
            {
              $unwind: "$data",
            },
            {
              $replaceRoot: {
                newRoot: "$data",
              },
            },
            {
              $unwind: "$crops",
            },
            {
              $project: {
                crops: 1,
              },
            },
            {
              $group: {
                _id: "$crops.crop",
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
              data: a,
            })
          );
          resolve();
        }

        if (mode == "check") {
          const { docnum, docname } = req.query;
          await Farmland.find({
            documentNumber: docnum,
            ownershipDocument: docname,
          })
            .then((data) => {
              res.status(200).end(
                JSON.stringify({
                  success: data.length > 0,
                  type: data[0].ownerType,
                  name: data[0].ownerName,
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

        if (mode == "fetch") {
          await Livelihood.aggregate([
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
            {
              $sort: {
                "name.name": 1,
              },
            },
          ])
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

        if (mode == "fetch-farmer-barangay") {
          const { brgy } = req.query;

          let query = {};
          if (brgy == "all") query = { "profile.type": { $in: ["Farmer"] } };
          else
            query = {
              "address.barangay": brgy,
              "profile.type": { $in: ["Farmer"] },
            };
          await Livelihood.find(query)
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

        if (mode == "fetch-history") {
          const { id } = req.query;
          let resp = await Livelihood.find({ _id: id }).catch((err) => {
            res.end(
              JSON.stringify({ success: false, message: "Error: " + err })
            );
          });

          res.status(200).end(
            JSON.stringify({
              success: true,
              data: resp[0].timeline,
            })
          );
          resolve();
        }

        if (mode == "log") {
          const { id, barangay, name, type } = req.query;

          await Livelihood.findOneAndUpdate(
            { _id: id },
            {
              $push: {
                timeline: {
                  time: moment(),
                  label: "Visited.",
                },
              },
            }
          )
            .then(() => {
              let newVisit = Log({
                name,
                barangay,
                type,
              });

              newVisit
                .save()
                .then(() => {
                  res.status(200).end(
                    JSON.stringify({
                      success: true,
                      message: "Successfully added to logs",
                    })
                  );
                  resolve();
                })
                .catch((error) => {
                  res.end(JSON.stringify(error));
                  resolve();
                });
            })
            .catch((error) => {
              res.end(JSON.stringify(error));
              resolve();
            });
        }

        if (mode == "get-land-info") {
          const { location } = req.query;

          let data = await Livelihood.aggregate([
            {
              $match: {
                "address.barangay": location,
              },
            },
            {
              $group: {
                _id: {
                  name: "$name.name",
                  lastname: "$name.lastName",
                },
                farmlandID: {
                  $push: "$farmlandID",
                },
              },
            },
            {
              $unwind: "$farmlandID",
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
            {
              $unwind: "$farmobj",
            },
          ]).catch((error) => {
            res.end(JSON.stringify(error));
            resolve();
          });

          res.status(200).end(
            JSON.stringify({
              success: true,
              data,
            })
          );
          resolve();
        }
      });
    }
    case "POST": {
      return new Promise(async (resolve, reject) => {
        const { mode } = req.body;

        if (mode == "add") {
          let newLivelihood = Livelihood(req.body.payload.newLivelihood);
          await Farmland.insertMany([...req.body.payload.arrayFarm])
            .then(async (e) => {
              let insertedIds = [];

              e?.forEach((el) => {
                insertedIds.push(el._id);
              });
              newLivelihood.farmlandID = insertedIds;

              await newLivelihood
                .save()
                .then(() => {
                  res.status(200).end(
                    JSON.stringify({
                      success: true,
                      message: "New profile added successfully",
                      id: newLivelihood._id,
                    })
                  );
                  resolve();
                })
                .catch((error) => {
                  res.end(JSON.stringify(error));
                  resolve();
                });
            })
            .catch((error) => {
              res.end(JSON.stringify(error));
              resolve();
            });
        }

        if (mode == "add-to-logs") {
          const { id, message, date } = req.body.payload;

          await Livelihood.findOneAndUpdate(
            { _id: id },
            {
              $push: {
                timeline: {
                  time: date,
                  label: message,
                },
              },
            }
          )
            .then(() => {
              res.status(200).end(
                JSON.stringify({
                  success: true,
                  message: "Successfully added to logs",
                })
              );
              resolve();
            })
            .catch((error) => {
              res.end(JSON.stringify(error));
              resolve();
            });
        }

        if (mode == "push-photo") {
          const { id, filenames } = req.body.payload;
          await Livelihood.findOneAndUpdate(
            { _id: id },
            {
              $push: {
                personalfiles: {
                  $each: filenames,
                },
              },
            }
          )
            .then(() => {
              res.status(200).end(
                JSON.stringify({
                  success: true,
                })
              );
              resolve();
            })
            .catch((error) => {
              res.end(JSON.stringify(error));
            });
        }

        if (mode == "profile-update") {
          const { id, path } = req.body.payload;

          await Livelihood.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                profileImage: path,
              },
            }
          )
            .then(() => {
              res.status(200).end(
                JSON.stringify({
                  success: true,
                  message: "Successfully change the profile.",
                })
              );
              resolve();
            })
            .catch((error) => {
              res.end(JSON.stringify(error));
            });
        }
      });
    }
    case "PUT": {
      return new Promise(async (resolve, reject) => {
        const { mode } = req.body.payload;

        if (mode == "set-imgs") {
          const { id, images } = req.body.payload;
          const { filenames, profile } = images;

          await Livelihood.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                personalfiles: filenames,
                profileImage: profile,
              },
            }
          ).catch((error) => {
            res.end(JSON.stringify(error));
          });

          res.status(200).end(
            JSON.stringify({
              success: true,
            })
          );
          resolve();
        }

        if (mode == "change-profile") {
          const { id, path } = req.body.payload;
          await Livelihood.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                brgyImage: path,
              },
            }
          ).catch((err) => {
            res.end(
              JSON.stringify({ success: false, message: "Error: " + err })
            );
          });
          res.status(200).end(
            JSON.stringify({
              success: true,
              message: "Successfully uploaded the image.",
            })
          );
          resolve();
        }

        if (mode == "update") {
          const { update, id } = req.body.payload;
          await Livelihood.findOneAndUpdate(
            { _id: id },
            {
              $set: update,
            }
          )
            .then(() => {
              res.status(200).end(JSON.stringify({ success: true }));
              resolve();
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
