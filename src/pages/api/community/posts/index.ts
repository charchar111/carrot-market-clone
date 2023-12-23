import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
): Promise<any> {
  //   if (req.method === "GET") {
  //     const products = await client.product.findMany({
  //       include: { _count: { select: { Favorites: true } } },
  //     });
  //     return res.status(200).json({ ok: true, products });
  //   }

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

    // const products = await client.product.create({
    //   data: {
    //     name,
    //     price: +price,
    //     description,
    //     user: { connect: { id: user?.id } },
    //     image: "",
    //   },
    // });

    return res.status(201).json({ ok: true, post: { id: post.id } });
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
