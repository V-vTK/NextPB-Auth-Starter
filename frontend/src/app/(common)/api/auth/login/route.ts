import pb from "@/pocketbase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

//https://blog.mahad.dev/setting-up-nextjs-and-pocketbase-for-authentication/
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const result = await pb.authenticate(email, password);
    const { record, token } = result;
    record.token = token;
    (await cookies()).set("pb_auth", pb.client.authStore.exportToCookie());
    return NextResponse.json(record);
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || err.toString() }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
