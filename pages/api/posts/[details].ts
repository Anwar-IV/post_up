import { prisma } from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      console.log("req.query --->", req.query);
      const data = await prisma.post.findUnique({
        where: {
          id: req.query.details as string,
        },
        include: {
          user: true,
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              user: true,
            },
          },
        },
      });
      res.status(200).json(data);
    } catch (error) {
      res
        .status(403)
        .json({ err: "Error has occured whilst fetching details" });
    }
  }
}
