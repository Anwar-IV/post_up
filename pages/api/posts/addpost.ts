import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res
        .status(401)
        .json({ message: "Please sign in to make a post." });

    const { title }: { title: string } = req.body;
    console.log(title);

    // Check title
    if (title.length > 300) {
      return res
        .status(403)
        .json({
          message:
            "Length exceeded 300 characters. Please write a shorter response.",
        });
    }
    if (!title.length) {
      return res.status(403).json({ message: "Text body cannot be empty." });
    }

    // Get User
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
    });

    // Create Post
    try {
      if (prismaUser) {
        const result = await prisma.post.create({
          data: {
            title,
            userId: prismaUser.id,
          },
        });
        return res.status(200).json(result);
      } else {
        return res
          .status(404)
          .json({ message: "No user found with that email!" });
      }
    } catch (error) {
      res.status(403).json({ message: "Something went wrong!" });
    }
  }
}
