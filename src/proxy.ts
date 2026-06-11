import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 16 renamed `middleware` to `proxy` (Node.js runtime by default).
const ADMIN_AUTH_COOKIE = "yi_admin_token";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1) Admin API gate — OPTIMISTIC pre-filter only. The real JWT verification
  // lives in `adminRouteHandler` inside each route handler.
  if (pathname.startsWith("/api/admin")) {
    if (pathname === "/api/admin/auth/login" || pathname === "/api/admin/auth/logout") {
      return NextResponse.next();
    }
    if (!req.cookies.get(ADMIN_AUTH_COOKIE)?.value) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Other API routes need no locale handling.
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // 2) English locale (/en/*): REWRITE to the prefix-less route and expose the
  // locale to server components via a request header. The browser URL keeps the
  // /en prefix (good for SEO/hreflang) but the existing TR pages render it in
  // English — no duplicate route files needed.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname === "/en" ? "/" : pathname.slice(3);
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-app-locale", "en");
    requestHeaders.set("x-pathname", pathname);
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  }

  // 3) Turkish (prefix-less default).
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-app-locale", "tr");
  requestHeaders.set("x-pathname", pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    // Admin API (auth gate) + all pages (locale), excluding static assets and
    // metadata files.
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
