import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
): Promise<any> {
  const { id } = req.query;
  if (!id) return res.status(400).json({ ok: false });
  const product = await client.product.findUnique({
    where: { id: +id.toString() },
    include: { user: { select: { id: true, name: true, avatar: true } } },
  });

  return res.status(200).json({ ok: true, product });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
