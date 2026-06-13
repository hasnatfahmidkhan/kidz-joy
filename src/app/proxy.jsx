import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(req) {
  const sessionCookie =
    req.cookies.get("next-auth.session-token") ||
    req.cookies.get("__Secure-next-auth.session-token");

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (sessionCookie) {
    if (req.url === "/login" || req.url.startsWith("/login?")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/login/:path*",
};
