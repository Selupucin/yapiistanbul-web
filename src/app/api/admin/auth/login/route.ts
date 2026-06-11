import { ADMIN_AUTH_COOKIE, loginAdmin, loginSchema, toErrorPayload } from "@repo/api";
import { NextResponse } from "next/server";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  if (!(await checkRateLimit(`login:${clientIp(req.headers)}`, 5, 60))) {
    return NextResponse.json(
      { ok: false, message: "Too many attempts. Please try again later." },
      { status: 429 }
    );
  }
  try {
    const body = await req.json();
    const parsed = loginSchema.parse(body);
    const { token, username } = await loginAdmin(parsed.username, parsed.password);

    const res = NextResponse.json({ ok: true, data: { username } });
    res.cookies.set(ADMIN_AUTH_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return res;
  } catch (error) {
    // Invalid credentials surface as ApiError(401); unexpected/validation errors
    // are sanitized by toErrorPayload so internal details never leak.
    const payload = toErrorPayload(error);
    const status = payload.status === 500 ? 401 : payload.status;
    return NextResponse.json({ ok: false, message: "Invalid credentials" }, { status });
  }
}
