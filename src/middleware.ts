import { NextResponse, userAgent } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import useUser from "./libs/client/useUser";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest, event: NextFetchEvent) {
  if (!request.nextUrl.pathname.startsWith("/api")) {
    const requestUserAgent = userAgent(request);

    if (requestUserAgent.isBot) {
      return new Response("A bot's access has been detected.", { status: 403 });
    }

    const PagesExceptionUserAuth = ["/enter"];

    if (
      !PagesExceptionUserAuth.includes(request.nextUrl.pathname) &&
      !request.cookies.has("carrotsession")
    ) {
      return NextResponse.redirect(new URL("/enter", request.url));
    }
  }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
