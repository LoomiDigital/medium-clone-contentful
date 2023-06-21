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
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"

    const reqBody = JSON.parse(req.body);
    const type = reqBody.sys.type;

    if (type === "DeletedEntry") {
      console.log("DeletedEntry");
      await res.revalidate("/");
      return res.json({ revalidated: true });
    }

    await res.revalidate(`/post/${reqBody.fields.slug}`);

    console.log("Revalidated");
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
