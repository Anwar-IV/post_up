import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { newTitle, id } = req.body;
    console.log("req.body -->", req.body);

    // If new title length is greater than 300...
    if (newTitle.length > 300) {
      return res.status(403).json({
        message:
          "Length exceeded 300 characters. Please write a shorter response.",
      });
    }

    // If post is empty
    if (!newTitle.length)
      return res.status(403).json({ message: "Text body cannot be empty." });

    // If all checks passed update the post
    try {
      const updatedPost = await prisma.post.update({
        where: {
          id,
        },
        data: {
          title: newTitle,
        },
      });
      res.status(201).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
