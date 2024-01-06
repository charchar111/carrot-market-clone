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
    query: { id },
  } = req;
  if (!id) return res.status(400).json({ ok: false });
  const live = await client.stream.findUnique({
    where: { id: +id.toString() },
    include: {
      user: { select: { id: true, name: true, avatar: true } },
      Messages: {
        include: { user: { select: { name: true, avatar: true, id: true } } },
      },
    },
  });

  if (!live)
    return res.status(404).json({
      ok: false,
      error: { message: "요청한 데이터를 찾을 수 없습니다." },
    });

  return res.status(200).json({ ok: true, live });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
