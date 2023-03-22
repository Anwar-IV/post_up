import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Please Sign In!" });
    // Delete a Post
    try {
      const id = req.body;
      console.log("id---->", req.body);
      const result = await prisma.post.delete({
        where: {
          id,
        },
      });
      console.log("result -->", result);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res
        .status(403)
        .json({ error: "An error has occured whilst deleting the post." });
    }
  }
}
