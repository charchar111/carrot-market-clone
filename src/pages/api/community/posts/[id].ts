import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
): Promise<any> {
  if (req.method === "GET") {
    const { id } = req.query;
    if (!id) return res.status(401).json({ ok: false });
    const post = await client.post.findUnique({
      where: { id: +id.toString() },
      include: {
        _count: { select: { Answers: true, Wonderings: true } },
        user: { select: { id: true, avatar: true, name: true } },
        Answers: {
          select: {
            createdAt: true,
            content: true,
            id: true,
            user: { select: { id: true, name: true, avatar: true } },
          },
        },
      },
    });
    if (!post)
      return res
        .status(404)
        .json({ ok: false, error: { message: "post is not found." } });
    return res.status(201).json({ ok: true, post });
  }
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
