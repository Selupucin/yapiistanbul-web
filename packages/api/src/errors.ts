export class ApiError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

export function toErrorPayload(error: unknown) {
  // ApiError messages are intentional and safe to expose to clients.
  if (error instanceof ApiError) {
    return { status: error.status, message: error.message };
  }

  // Unexpected errors may carry internal details (stack traces, driver
  // messages). Log them server-side and return a generic message in production.
  if (error instanceof Error) {
    if (process.env.NODE_ENV !== "production") {
      return { status: 500, message: error.message };
    }
    console.error("[api] Unhandled error:", error);
    return { status: 500, message: "Server error" };
  }

  return { status: 500, message: "Unexpected error" };
}
