import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Secret, SignOptions } from "jsonwebtoken";
import { AdminModel, connectToDatabase } from "@repo/db";
import { ApiError } from "./errors";
import { hasDatabaseConfig } from "./env";

const WEAK_DEFAULT_SECRET = "dev-only-change-me";

// Resolve the JWT secret lazily (at request time, not module load) so that a
// missing secret never breaks the production build, but also never lets the
// app sign/verify tokens with the well-known weak default in production.
function getJwtSecret(): Secret {
  const secret = process.env.JWT_SECRET;
  if (secret && secret !== WEAK_DEFAULT_SECRET) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new ApiError("Server authentication is misconfigured", 500);
  }
  return WEAK_DEFAULT_SECRET;
}

const JWT_EXPIRES_IN: SignOptions["expiresIn"] =
  (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "7d";

export type AdminTokenPayload = {
  sub: string;
  username: string;
};

export function signAdminToken(
  payload: AdminTokenPayload,
  expiresIn: SignOptions["expiresIn"] = JWT_EXPIRES_IN
) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn });
}

export function verifyAdminToken(token: string): AdminTokenPayload {
  return jwt.verify(token, getJwtSecret()) as AdminTokenPayload;
}

export async function ensureDefaultAdmin() {
  if (!hasDatabaseConfig()) {
    throw new ApiError("Database config missing", 500);
  }

  await connectToDatabase();

  // If any admin already exists, never auto-create another — credentials live
  // in the database (managed via scripts/set-admin.mjs). The ADMIN_* env vars
  // only seed the very first admin on a completely empty database.
  const count = await AdminModel.countDocuments();
  if (count > 0) return;

  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) {
    throw new ApiError("Admin credentials are not configured", 500);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await AdminModel.create({ username, passwordHash });
}

export async function loginAdmin(username: string, password: string, rememberMe = false) {
  if (!hasDatabaseConfig()) {
    throw new ApiError("Database config missing", 500);
  }

  await connectToDatabase();
  await ensureDefaultAdmin();

  const admin = await AdminModel.findOne({ username }).lean();
  if (!admin) {
    throw new ApiError("Invalid credentials", 401);
  }

  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) {
    throw new ApiError("Invalid credentials", 401);
  }

  const token = signAdminToken(
    { sub: String(admin._id), username: admin.username },
    rememberMe ? "30d" : JWT_EXPIRES_IN
  );
  return { token, username: admin.username };
}
