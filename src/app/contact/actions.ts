"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createMeetingRequest } from "@repo/api";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";

export async function submitMeetingRequestAction(formData: FormData) {
  const h = await headers();
  if (!(await checkRateLimit(`contact:${clientIp(h)}`, 5, 300))) {
    redirect("/contact?error=rate_limited");
  }

  await createMeetingRequest({
    fullName: String(formData.get("fullName") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || ""),
    message: String(formData.get("message") || ""),
  });

  revalidatePath("/dashboard/meeting-requests");
  redirect("/contact?sent=1");
}
