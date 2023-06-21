import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Revalidating");
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const reqBody = JSON.parse(req.body);

    await res.revalidate("/");

    const { type, revision } = reqBody.sys;

    if (type !== "DeletedEntry" && revision > 1) {
      console.log("Entry deleted or updated");
      await res.revalidate(`/post/${reqBody.fields.slug["en-US"]}`);
    }

    console.log("Entry revalidated");
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
