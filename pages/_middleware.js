import { NextRequest, NextResponse } from "next/server";

export async function middleware(req = NextRequest) {
  const url = req.nextUrl.clone();
  if (url.pathname === "/") {
    const isLoggedIn = JSON.parse(req.cookies["loggedIn"] || "false");
    url.pathname = `/${isLoggedIn ? "user/dashboard" : "user/login"}`;
    return NextResponse.rewrite(url);
  }
}
