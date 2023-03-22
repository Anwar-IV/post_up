import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Fetch all posts
    try {
      const data = await prisma.post.findMany({
        include: {
          user: true,
          comments: true,
          likes: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      console.log("fetched prisma data -->", data);
      res.status(200).json(data);
    } catch (error: any) {
      res
        .status(403)
        .json(
          error?.message
            ? error?.message
            : { error: "Error occured whilst fetching posts." }
        );
    }
  }
}
