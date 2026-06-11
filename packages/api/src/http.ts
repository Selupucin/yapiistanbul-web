import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ApiError, toErrorPayload } from "./errors";
import { verifyAdminToken, type AdminTokenPayload } from "./auth";
import { ADMIN_AUTH_COOKIE } from "./constants";

export async function routeHandler<T>(fn: () => Promise<T>) {
  try {
    const data = await fn();
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    const payload = toErrorPayload(error);
    return NextResponse.json({ ok: false, message: payload.message }, { status: payload.status });
  }
}

/**
 * Verify the admin session from the HttpOnly cookie. Throws ApiError(401) when
 * the cookie is missing or the JWT signature/expiry is invalid. This is the
 * real authorization boundary — never rely on proxy presence checks alone.
 */
export async function requireAdmin(): Promise<AdminTokenPayload> {
  const store = await cookies();
  const token = store.get(ADMIN_AUTH_COOKIE)?.value;
  if (!token) {
    throw new ApiError("Unauthorized", 401);
  }
  try {
    return verifyAdminToken(token);
  } catch {
    throw new ApiError("Unauthorized", 401);
  }
}

/** Route handler wrapper that enforces a valid admin session before running fn. */
export function adminRouteHandler<T>(fn: (admin: AdminTokenPayload) => Promise<T>) {
  return routeHandler(async () => {
    const admin = await requireAdmin();
    return fn(admin);
  });
}
