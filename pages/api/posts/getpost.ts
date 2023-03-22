import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Please sign in!" });

    // Get Post
    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session.user?.email!,
        },
        include: {
          posts: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              comments: true,
              likes: true,
            },
          },
        },
      });
      if (!data) return res.status(404).json({ message: "User not found!" });
      return res.status(200).json(data);
    } catch (error) {
      res
        .status(403)
        .json({ message: "Something went wrong fetching the users post!" });
    }
  }
}
