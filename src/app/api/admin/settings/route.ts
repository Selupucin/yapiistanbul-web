import { adminRouteHandler, getSettings, upsertSettings } from "@repo/api";

export const GET = () => adminRouteHandler(() => getSettings());

export async function PATCH(req: Request) {
  return adminRouteHandler(async () => {
    const body = await req.json();
    return upsertSettings(body);
  });
}
