import { adminRouteHandler, getContact, upsertContact } from "@repo/api";

export const GET = () => adminRouteHandler(() => getContact());

export async function PATCH(req: Request) {
  return adminRouteHandler(async () => {
    const body = await req.json();
    return upsertContact(body);
  });
}
