import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 16 renamed `middleware` to `proxy` (Node.js runtime by default).
// This is an OPTIMISTIC pre-filter only: it cheaply rejects admin API requests
// that carry no session cookie. The real authorization boundary (JWT signature
// verification) lives in `adminRouteHandler` inside each route handler — never
// rely on this proxy alone.
const ADMIN_AUTH_COOKIE = "yi_admin_token";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }

  // Auth endpoints must stay reachable without a session.
  if (pathname === "/api/admin/auth/login" || pathname === "/api/admin/auth/logout") {
    return NextResponse.next();
  }

  if (!req.cookies.get(ADMIN_AUTH_COOKIE)?.value) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*"],
};
