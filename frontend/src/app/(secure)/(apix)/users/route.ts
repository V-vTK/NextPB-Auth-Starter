import { getPb} from "@/pocketbase/pocketbaseUtils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        // Example NextJS API route in secure (apix) directory
        const pb = await getPb()
        console.log("PocketBase instance:", pb) 
        const params = new URL(request.url).searchParams;
        console.log("Search parameters:", params);
        return NextResponse.json([]);
    } catch (error: any) {
        console.error("Error in GET /users route:", error);
        return new NextResponse(
            JSON.stringify({ error: error.message || error.toString() }), {
                status: 500,
                headers: {
                "Content-Type": "application/json",
                },
            }
        );
    }
}