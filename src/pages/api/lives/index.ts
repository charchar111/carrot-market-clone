import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
): Promise<any> {
  if (req.method === "GET") {
    const lives = await client.stream.findMany({});
    return res.status(200).json({ ok: true, lives });
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
