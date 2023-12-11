import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { withApiSession } from "@/libs/server/withSession";

declare module "iron-session" {
  interface IronSessionData {
    user?: { id: number };
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
): Promise<any> {
  console.log(req.session.user);

  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });

  return res.status(200).json({ ok: true, profile });
}

export default withApiSession(withHandler({ method: "GET", handler }));
