import { adminRouteHandler, createBlog, listBlogs } from "@repo/api";

export const GET = () => adminRouteHandler(() => listBlogs());

export async function POST(req: Request) {
  return adminRouteHandler(async () => {
    const body = await req.json();
    return createBlog(body);
  });
}
