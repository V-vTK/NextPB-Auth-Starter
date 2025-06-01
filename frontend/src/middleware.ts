import { NextRequest, NextResponse } from "next/server";
import pocketbase from "./pocketbase";

// https://blog.mahad.dev/setting-up-nextjs-and-pocketbase-for-authentication
export async function middleware(request: NextRequest) {
  const isLoggedIn = await pocketbase.isAuthenticated(request.cookies as any);

  if (request.nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  if (
    request.nextUrl.pathname &&
    request.nextUrl.pathname.startsWith("/auth")
  ) {
    if (isLoggedIn) {
      const redirectTo =
        request.nextUrl.searchParams.get("redirectTo") || "/dashboard";
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
    return;
  }

  if (!isLoggedIn) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set(
      "redirectTo",
      request.nextUrl.pathname + request.nextUrl.search
    );
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|frontpage|help|about).*)",
  ],
};
