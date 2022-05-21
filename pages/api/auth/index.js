import User from "../../../database/model/User";
import dbConnect from "../../../database/dbConnect";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  switch (method) {
    case "GET":
      return new Promise(async (resolve, reject) => {
        await User.find()
          .then((resp) => {
            res.status(200).end({
              success: true,
              data: resp,
            });
            resolve();
          })
          .catch((error) => {
            res.end(JSON.stringify(error));
            resolve();
          });
      });
    case "POST":
      return new Promise(async (resolve, reject) => {
        const { username, password, type, email } = req.body.payload;

        if (type == "admin") {
          await User.find()
            .then((resp) => {
              let _user = resp.filter(
                (el) => el.username == username || el.email == email
              );

              if (_user.length > 0) {
                if (password && _user[0].password == password) {
                  res.status(200).end(
                    JSON.stringify({
                      success: true,
                      message: "Login Successfully",
                      user: _user[0],
                      mode: "validated",
                    })
                  );
                  resolve();
                } else if (
                  password &&
                  _user[0].password &&
                  _user[0].password != password
                ) {
                  res.end(
                    JSON.stringify({
                      success: false,
                      message: "Wrong password",
                      mode: "wrong-pass",
                    })
                  );
                  resolve();
                } else if (!password && _user[0].password) {
                  res.status(200).end(
                    JSON.stringify({
                      success: false,
                      mode: "with-pass",
                    })
                  );
                  resolve();
                } else {
                  res.status(200).end(
                    JSON.stringify({
                      success: true,
                      mode: "admin-no-pass",
                      email: _user[0].email,
                    })
                  );
                  resolve();
                }
              } else {
                res.end(
                  JSON.stringify({
                    success: false,
                    message: "Wrong credentials",
                    mode: "not-exist",
                  })
                );
                resolve();
              }
            })
            .catch((error) => {
              res.end(JSON.stringify(error));
              resolve();
            });
        }

        if (type == "superadmin") {
          const { pass } = req.body.payload;
          let superadmin = await User.find({ role: "superadmin" });
          if (pass == superadmin[0].password)
            res.status(200).end(
              JSON.stringify({
                success: true,
                user: superadmin[0],
                message: "Login Successfully",
                mode: "validated",
              })
            );
          else
            res.end(
              JSON.stringify({
                status: false,
                message: "Password in incorrect.",
              })
            );

          resolve();
        }

        if (type == "new-admin-update") {
          await User.findOneAndUpdate(
            {
              email: req.body.payload.email,
            },
            { $set: req.body.payload },
            { new: true }
          )
            .then((doc) => {
              res.status(200).end(
                JSON.stringify({
                  success: true,
                  user: doc,
                  message: "Login Successfully",
                })
              );
              resolve();
            })
            .catch((error) => {
              res.end(JSON.stringify(error));
              resolve();
            });
        }
      });
    default:
      res.status(400).end(JSON.stringify({ success: false }));
  }
}
