// 파일 post 요청을 cloudflare에 전송, 보안 url 수신

import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
): Promise<any> {
  return res.status(200).json({ ok: true, url: "" });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
