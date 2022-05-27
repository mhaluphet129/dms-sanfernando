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
        let { type, mode } = req.query;

        if (mode == "check") {
          const { docnum } = req.query;
          await Farmland.find({ documentNumber: docnum })
            .then((data) => {
              res.status(200).end(JSON.stringify({ success: data.length > 0 }));
              resolve();
            })
            .catch((err) => {
              res.end(
                JSON.stringify({ success: false, message: "Error: " + err })
              );
            });
        }

        if (mode == "fetch") {
          await Livelihood.find({ "profile.type": { $in: [type] } })
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

          await Livelihood.find({
            "address.barangay": brgy,
            "profile.type": { $in: ["Farmer"] },
          })
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
              newLivelihood.timeline = [
                {
                  time: moment(),
                  label: "This profile is newly added.",
                },
              ];

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
      const { mode } = req.body.payload;

      if (mode == "change-profile") {
        const { id, path } = req.body.payload;
        await Livelihood.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              brgyImage: path,
            },
          }
        )
          .then(() => {
            res.status(200).end(
              JSON.stringify({
                success: true,
                message: "Successfully uploaded the image.",
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
    }
    default:
      res.status(400).end(JSON.stringify({ success: false }));
  }
}
