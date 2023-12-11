import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
): Promise<any> {
  const {
    body: { price, description, name },
    session: { user },
  } = req;

  const product = await client.product.create({
    data: {
      name,
      price: +price,
      description,
      user: { connect: { id: user?.id } },
      image: "",
    },
  });

  return res.status(200).json({ ok: true, product });
}

export default withApiSession(withHandler({ method: "POST", handler }));
