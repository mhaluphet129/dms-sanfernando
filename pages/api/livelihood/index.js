import dbConnect from "../../../database/dbConnect";
import User from "../../../database/model/User";

export default async function handler(req, res) {
  await dbConnect();
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
