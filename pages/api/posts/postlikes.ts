import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(403).json("Please sign in to like a post.");

    // Get User
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user?.email!,
        },
      });

      // Destructure postId
      const { postId } = req.body as {
        postId: string;
      };

      // Check Like
      const likedPost = await prisma.likes.findUnique({
        where: {
          postId_userId: {
            postId,
            userId: user?.id!,
          },
        },
      });
      console.log("likedPost -->", likedPost);
      if (likedPost) {
        // The user has liked the post so unlike it
        const unliked = await prisma.likes.delete({
          where: {
            postId_userId: {
              postId: likedPost.postId,
              userId: likedPost.userId,
            },
          },
        });
        console.log("unliked -->", unliked);
        res.status(200).json(unliked);
      }
      // If the user has not liked that post...
      if (likedPost === null) {
        const newLike = await prisma.likes.create({
          data: {
            userId: user?.id!,
            postId,
          },
        });
        console.log("newLike -->", newLike);
        res.status(201).json(newLike);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }
}
