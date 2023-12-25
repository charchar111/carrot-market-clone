import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
): Promise<any> {
  if (req.method === "GET") {
    const posts = await client.post.findMany({
      where: {},

      include: { _count: true, user: { select: { id: true, name: true } } },
    });
    return res.status(200).json({ ok: true, posts });
  }

  if (req.method === "POST") {
    const {
      body: { title, content },
      session: { user },
    } = req;

    if (!title || !content) return res.status(401).json({ ok: false });

    const post = await client.post.create({
      data: {
        title,
        content,
        user: { connect: { id: user?.id } },
      },
    });
    console.log("post", post);

    return res.status(201).json({ ok: true, post: { id: post.id } });
  }
}

export default withApiSession(
  withHandler({ methods: ["POST", "GET"], handler }),
);
