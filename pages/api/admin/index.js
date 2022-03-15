import dbConnect from "../../../database/dbConnect";
import User from "../../../database/model/User";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "GET": {
      return await new Promise(async (resolve, reject) => {
        const { mode } = req.query;
        if (mode == "fetch") {
          const { current, pageSize } = req.query;
          let totalAdmins = await User.countDocuments({ role: "admin" });
          let totalSuperAdmin = await User.countDocuments({
            role: "superadmin",
          });
          await User.find()
            .limit(parseInt(pageSize, 10))
            .skip((parseInt(current, 10) - 1) * parseInt(pageSize, 10))
            .then((data) => {
              res.status(200).end(
                JSON.stringify({
                  success: true,
                  message: "Fetch successfully",
                  users: data,
                  total: totalAdmins,
                  totalSA: totalSuperAdmin,
                })
              );
              resolve();
            })
            .catch((err) => {
              res.end(
                JSON.stringify({ success: false, message: "Error: " + err })
              );
            });
        } else if (mode == "recent") {
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
        } else if (mode == "delete") {
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
        } else if (mode == "fetchall") {
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
        } else if (mode == "changepass") {
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
        let user = User({ email, timeline });
        await user
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

          await User.findOneAndUpdate({ _id: id }, obj)
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
                JSON.stringify({ success: false, message: "Error: " + err })
              );
            });
        } else if (mode == "tosuperadmin") {
          const { id, addtimeline } = req.body.payload;
          const { time, label } = addtimeline;
          await User.findOneAndUpdate(
            { _id: id },
            {
              $set: { role: "superadmin" },
              $push: { timeline: { time, label } },
            }
          )
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
