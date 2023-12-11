import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

interface configType {
  method: "GET" | "POST" | "DELETE";
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

export default function withHandler({
  method,
  handler,
  isPrivate = true,
}: configType) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) return res.status(405).end();

    if (isPrivate && !req.session.user)
      return res
        .status(401)
        .json({ ok: false, error: { message: "please login" } });

    try {
      await handler(req, res);
    } catch (error: any) {
      console.log("에러 발생", error.message);
      return res.status(500).json({ error: { message: error.message } });
    }
  };
}
// api route 접근의 유효성 검사 역할
//// method 검사

// 작업 후 결과 반환
