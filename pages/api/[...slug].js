// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ pid: req.query.slug.join(", ") });
  console.log(req.body.payload);
}
