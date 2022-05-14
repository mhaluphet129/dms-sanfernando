import dbConnect from "../../../database/dbConnect";
import Livelihood from "../../../database/model/Livelihood";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "GET": {
      return new Promise(async (resolve, reject) => {
        let { type } = req.query;

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
      });
    }
    case "POST": {
      return new Promise(async (resolve, reject) => {
        let newLivelihood = Livelihood(req.body.payload);
        await newLivelihood
          .save()
          .then(() => {
            res.status(200).end(
              JSON.stringify({
                success: true,
                message: "New livelihood added successfully",
              })
            );
            resolve();
          })
          .catch((error) => {
            res.end(JSON.stringify(error));
            resolve();
          });
      });
    }
    default:
      res.status(400).end(JSON.stringify({ success: false }));
  }
}
// internals.get_region = async (req, res) => {
//     let philippines = await Regions.aggregate([
//       {
//         $lookup: {
//           from: "provinces",
//           let: { regionId: "$_id" },
//           pipeline: [
//             { $match: { $expr: { $eq: ["$regionId", "$$regionId"] } } },
//             {
//               $lookup: {
//                 from: "citymunicipalities",
//                 let: { provinceId: "$_id" },
//                 pipeline: [
//                   {
//                     $match: {
//                       $expr: {
//                         $eq: ["$provinceId", "$$provinceId"],
//                       },
//                     },
//                   },
//                 ],
//                 as: "citymunicipalities",
//               },
//             },
//           ],
//           as: "provinces",
//         },
//       },
//       {
//         $project: {
//           name: 1,
//           island: 1,
//           "provinces._id": 1,
//           "provinces.name": 1,
//           "provinces.citymunicipalities._id": 1,
//           "provinces.citymunicipalities.name": 1,
//         },
//       },
//     ]).catch((err) => {
//       return { success: false, msg: "Error: " + err };
//     });

//     return { success: true, data: philippines };
//   };
