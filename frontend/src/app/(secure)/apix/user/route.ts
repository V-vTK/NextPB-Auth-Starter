import { getUser } from "@/pocketbase/pocketbaseUtils";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await getUser()
        return NextResponse.json(user);
    } catch (err: any) {
        return new Response(
            JSON.stringify({ error: err.message || err.toString() }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}