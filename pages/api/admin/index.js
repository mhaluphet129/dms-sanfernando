import dbConnect from "../../../database/dbConnect";
import User from "../../../database/model/User";
import Log from "../../../database/model/Log";
var ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "GET": {
      return await new Promise(async (resolve, reject) => {
        const { mode } = req.query;

        if (mode == "fetch-by-id") {
          const { id } = req.query;

          await User.find({ _id: id })
            .then((data) => {
              res.status(200).end(
                JSON.stringify({
                  success: true,
                  message: "Fetch successfully",
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

        if (mode == "fetch") {
          const { current, pageSize } = req.query;
          let totalAdmins = await User.countDocuments({ role: "admin" });

          let data = await User.find({ role: "admin" })
            .limit(parseInt(pageSize, 10))
            .skip((parseInt(current, 10) - 1) * parseInt(pageSize, 10))
            .catch((err) => {
              res.end(
                JSON.stringify({ success: false, message: "Error: " + err })
              );
            });

          let superadmin = await User.find({ role: "superadmin" }).catch(
            (err) => {
              res.end(
                JSON.stringify({ success: false, message: "Error: " + err })
              );
            }
          );

          res.status(200).end(
            JSON.stringify({
              success: true,
              message: "Fetch successfully",
              users: data,
              total: totalAdmins,
              superadmin: superadmin[0],
            })
          );
          resolve();
        }

        if (mode == "recent") {
          await User.find({ role: "admin" })
            .sort({ $natural: -1 })
            .limit(3)
            .then((data) => {
              res.status(200).end(
                JSON.stringify({
                  success: true,
                  users: data,
                })
              );
            });
        }

        if (mode == "delete") {
          const { id } = req.query;
          await User.findOneAndDelete({ _id: id })
            .then(() => {
              res.status(200).end(
                JSON.stringify({
                  success: true,
                  message: "Successfully deleted",
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

        if (mode == "fetchall") {
          const { role } = req.query;
          await User.find({ role })
            .then((data) => {
              res.status(200).end(
                JSON.stringify({
                  success: true,
                  message: "Fetch successfully",
                  users: data,
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

        if (mode == "changepass") {
          const { _id } = req.query;

          await User.find({ _id })
            .then((data) => {
              res.status(200).end(
                JSON.stringify({
                  success: true,
                  message: "Fetch successfully",
                  user: data,
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
      });
    }
    case "POST": {
      return await new Promise(async (resolve, reject) => {
        const { email, timeline } = req.body.payload;

        let search = await User.find({ email });

        if (search.length > 0) {
          res.status(202).end(
            JSON.stringify({
              success: false,
              message: "This email is already registered.",
            })
          );
          resolve();
        }

        let user = User({ email, timeline });
        await user
          .save()
          .then(async () => {
            let newVisit = Log({
              type: "event",
              description: `admin account email '${email}' has been added.`,
            });

            await newVisit
              .save()
              .then(() => {
                res.status(200).end(
                  JSON.stringify({
                    success: true,
                    message: "Admin added successfully",
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
      });
    }

    case "PUT": {
      return await new Promise(async (resolve, reject) => {
        const { mode } = req.body.payload;
        if (mode == "edit" || mode == "changepassword") {
          const { id } = req.body.payload;
          let obj = {};
          obj["$set"] = { ...req.body.payload };

          if (req.body.payload.hasOwnProperty("addtimeline")) {
            const { time, label } = req.body.payload.addtimeline;
            obj["$push"] = {
              timeline: { time, label },
            };
          }
          await User.findOneAndUpdate({ _id: id }, obj, { new: true })
            .then(async (data) => {
              let newVisit = Log({
                type: "event",
                description: req.body.payload.addtimeline.label,
              });
              let _obj = {
                _id: data?._id,
                password: data?.password,
                lastname: data?.lastname,
                name: data?.name,
                username: data?.username,
                email: data?.email,
                role: data?.role,
                profile: data?.profile,
              };
              await newVisit
                .save()
                .then(() => {
                  res.status(200).end(
                    JSON.stringify({
                      success: true,
                      message: "Updated successfully",
                      user: _obj,
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
        } else if (mode == "tosuperadmin") {
          const { id, addtimeline, saID } = req.body.payload;
          const { time, label } = addtimeline;
          await User.findOneAndUpdate(
            { _id: id },
            {
              $set: { role: "superadmin" },
              $push: { timeline: { time, label } },
            }
          )
            .then(async () => {
              await User.findOneAndUpdate(
                {
                  _id: ObjectId(saID),
                  role: "superadmin",
                },
                {
                  $set: { role: "admin" },
                }
              ).then(async () => {
                let newVisit = Log({
                  type: "event",
                  description: label,
                });

                await newVisit
                  .save()
                  .then(() => {
                    res.status(200).end(
                      JSON.stringify({
                        success: true,
                        message: "Updated successfully",
                      })
                    );
                    resolve();
                  })
                  .catch((err) => {
                    res.end(
                      JSON.stringify({
                        success: false,
                        message: "Error: " + err,
                      })
                    );
                  });
              });
            })
            .catch((err) => {
              res.end(
                JSON.stringify({ success: false, message: "Error: " + err })
              );
            });
        } else if (mode == "change-profile") {
          const { id, path } = req.body.payload;
          await User.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                profile: path,
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
      });
    }

    default: {
      return await new Promise(async (resolve, reject) => {
        res.status(400).end(
          JSON.stringify({
            success: false,
            message: "Request can't be proccessed right now.",
          })
        );
        resolve();
      });
    }
  }
}
