import { cookies } from "next/headers";

import pb from "@/pocketbase";
import PocketBase from "pocketbase";
import { ServerUser } from "@/interfaces/ServerUser";

export async function getPb() {
  const cookieStore = await cookies();
  const result = await pb.getPBclient(cookieStore);
  return result as PocketBase;
}

export async function getUser() {
  const cookieStore = await cookies();
  const result = await pb.getPBUser(cookieStore);
  return result as ServerUser;
}

export async function getUserAndClient() {
  const pb: PocketBase = await getPb();
  const user: ServerUser = await getUser();
  return { pb, user };
}
