import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { title, postId } = req.body;
    console.log("req.body-->", req.body);
    if (title.length > 300) {
      return res.status(403).json({
        message:
          "Length exceeded 300 characters. Please write a shorter response.",
      });
    }
    if (!title.length) {
      return res.status(403).json({ message: "Text body cannot be empty." });
    }
    try {
      const session = await getServerSession(req, res, authOptions);
      if (!session)
        return res
          .status(401)
          .json({ message: "You need to be signed in to make a post!" });

      //Get the User
      const user = await prisma.user.findUnique({
        where: {
          email: session.user?.email!,
        },
      });
      // Add a comment
      const result = await prisma.comment.create({
        data: {
          text: title,
          userId: user?.id!,
          postId,
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({ message: "Something went wrong!" });
    }
  }
}
