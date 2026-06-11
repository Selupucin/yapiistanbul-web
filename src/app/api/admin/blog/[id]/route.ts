import { adminRouteHandler, deleteBlog, updateBlog } from "@repo/api";

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  return adminRouteHandler(async () => {
    const body = await req.json();
    return updateBlog(id, body);
  });
}

export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  return adminRouteHandler(() => deleteBlog(id));
}
