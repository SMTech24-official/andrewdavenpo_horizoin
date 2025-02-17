/* eslint-disable @typescript-eslint/no-explicit-any */

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "./types/common";
import { authKey } from "./constants/authkey";
import { jwtDecode } from "jwt-decode";

// Define route groups
const AuthRoutes = ["/forget-password", "/login", "/signup"];
const AdminRoutes = ["/dashboard/:path*"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the token from cookies
  const accessToken = (await cookies()).get(authKey)?.value;
  console.log(accessToken);

  // If no token, redirect to sign-in for non-auth routes
  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next(); // Allow access to auth routes
    }
    return NextResponse.redirect(new URL("/login", request.url)); // Redirect to sign-in
  }

  // Decode the token to get user details
  let decodedData: { role?: string } | null = null;
  if (accessToken) {
    decodedData = jwtDecode(accessToken) as any;
  }
  const role: UserRole = decodedData?.role as unknown as UserRole;

  console.log(role);

  // Check if the user is trying to access admin routes
  if (AdminRoutes.some((route) => pathname.startsWith(route))) {
    if (role !== UserRole.ADMIN && role !== UserRole.SUPER_ADMIN) {
      return NextResponse.redirect(new URL("/login", request.url)); // Redirect to sign-in if not admin or superadmin
    }
  }

  return NextResponse.next(); // Allow access to other routes
}

export const config = {
  matcher: [
    // all admin routes (dashboard)
    "/dashboard/:path*",
    "/member/:path*",
    "/order/:path*",
    "/productDetails/:path*",
    "/",
  ],
};
