import { MeetingRequestModel, connectToDatabase } from "@repo/db";
import { ApiError } from "../errors";
import { hasDatabaseConfig } from "../env";
import { meetingRequestSchema, meetingRequestStatusSchema } from "../validation";
import { toPlain } from "../plain";

type MeetingStatus = "new" | "pending" | "overdue" | "contacted";

export function getMeetingStatus(createdAt: string | Date, persistedStatus?: string): MeetingStatus {
  if (persistedStatus === "contacted") return "contacted";

  const created = new Date(createdAt);
  const diffMs = Date.now() - created.getTime();
  const hours = diffMs / (1000 * 60 * 60);

  if (hours <= 24) return "new";
  if (hours <= 72) return "pending";
  if (hours >= 168) return "overdue";
  return "pending";
}

export async function listMeetingRequests() {
  if (!hasDatabaseConfig()) return [];
  await connectToDatabase();
  const items = await MeetingRequestModel.find().sort({ createdAt: -1 }).lean();
  return toPlain(
    items.map((item) => ({
      ...item,
      status: getMeetingStatus(item.createdAt, item.status),
    }))
  );
}

export async function createMeetingRequest(input: unknown) {
  const parsed = meetingRequestSchema.parse(input);
  if (!hasDatabaseConfig()) {
    return toPlain({ _id: `local-${Date.now()}`, ...parsed, status: "new", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  }

  await connectToDatabase();
  const created = await MeetingRequestModel.create(parsed);
  return toPlain(created.toObject());
}

export async function updateMeetingRequestStatus(id: string, status: unknown) {
  const parsedStatus = meetingRequestStatusSchema.parse(status);

  if (!hasDatabaseConfig()) {
    return toPlain({ _id: id, status: parsedStatus, updatedAt: new Date().toISOString() });
  }

  await connectToDatabase();
  const updated = await MeetingRequestModel.findByIdAndUpdate(
    id,
    { $set: { status: parsedStatus } },
    { new: true }
  ).lean();

  if (!updated) {
    throw new ApiError("Meeting request not found", 404);
  }

  return toPlain({
    ...updated,
    status: getMeetingStatus(updated.createdAt, updated.status),
  });
}

export async function deleteMeetingRequest(id: string) {
  if (!hasDatabaseConfig()) {
    return { _id: id, deleted: true };
  }

  await connectToDatabase();
  const deleted = await MeetingRequestModel.findByIdAndDelete(id).lean();
  if (!deleted) {
    throw new ApiError("Meeting request not found", 404);
  }
  return toPlain({ _id: String(deleted._id), deleted: true });
}