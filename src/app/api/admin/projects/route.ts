import { adminRouteHandler, createProject, listProjects } from "@repo/api";

export const GET = () => adminRouteHandler(() => listProjects());

export async function POST(req: Request) {
  return adminRouteHandler(async () => {
    const body = await req.json();
    return createProject(body);
  });
}
