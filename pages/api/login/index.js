import User from "../../../database/model/User";
import dbConnect from "../../../database/dbConnect";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  const { username, password } = req.body.payload;
  switch (method) {
    case "GET":
      try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      return new Promise(async (resolve, reject) => {
        await User.find()
          .then((resp) => {
            let _user = resp.filter((el) => el.username == username);

            if (_user.length > 0) {
              if (_user[0].password == password) {
                res.status(200).end(
                  JSON.stringify({
                    success: true,
                    message: "Login Successfully",
                    user: _user,
                  })
                );
                resolve();
              } else {
                res.end(
                  JSON.stringify({
                    success: false,
                    message: "Wrong password",
                  })
                );
                resolve();
              }
            } else {
              res.end(
                JSON.stringify({
                  success: false,
                  message: "Wrong credentials",
                })
              );
              resolve();
            }
          })
          .catch((error) => {
            res.end(JSON.stringify(error));
            resolve();
          });
      });
      break;
    default:
      res.status(400).end(JSON.stringify({ success: false }));
      break;
  }
}
