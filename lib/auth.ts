import "server-only";
import { CURRENT_USER_ID } from "@/lib/constants";

export async function getAuthenticatedUserId(): Promise<string> {
  return CURRENT_USER_ID;
}
