import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { withApiSession } from "@/libs/server/withSession";
import { ITEM_PER_PAGE } from "@/libs/constant";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
): Promise<any> {
  if (req.method === "GET") {
    const { page } = req.query;

    if (!page || isNaN(Number(page)) || +page < 1 || +page % 1 !== 0)
      return res.status(400).json({ ok: false });

    const countTotalLive = await client.stream.count({});

    const lives = await client.stream.findMany({
      take: ITEM_PER_PAGE,
      skip: (+page.toString() - 1) * ITEM_PER_PAGE,
      orderBy: { id: "asc" },
    });
    return res.status(200).json({ ok: true, lives, countTotalLive });
  }

  if (req.method === "POST") {
    const {
      body: { price, description, name },
      session: { user },
    } = req;

    if (!name || !price || isNaN(Number(price)))
      return res.status(400).json({
        ok: false,
        error: {
          message:
            "입력형식이 올바르지 않습니다. 이름이나 가격을 작성해주시고 가격은 숫자로 적어주세요.",
        },
      });

    const live = await client.stream.create({
      data: {
        name,
        price: +price,
        description: description || null,
        user: { connect: { id: user?.id } },
      },
    });

    return res.status(201).json({ ok: true, live });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler }),
);
