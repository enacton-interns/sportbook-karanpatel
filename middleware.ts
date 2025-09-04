import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Public routes (no authentication required)
const publicRoutes = [
  "/",
  "/about",
  "/venues",
  "/contact",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify",
  "/api/auth",
];

// Check if route is public
function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const role = (req.nextauth.token?.role as string) || undefined;

    // Allow access to public routes
    if (isPublicRoute(pathname)) {
      return NextResponse.next();
    }

    // If not logged in → redirect to login
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Player-only routes
    if (pathname.startsWith("/player") && role !== "USER") {
      return NextResponse.redirect(new URL("/denied", req.url));
    }

    // Venue Owner-only routes
    if (pathname.startsWith("/owner") && role !== "OWNER") {
      return NextResponse.redirect(new URL("/denied", req.url));
    }

    // Admin-only routes
    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/denied", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/player/:path*", "/owner/:path*", "/admin/:path*"],
};

//matcher: ["/dashboard/:path*", "/admin/:path*"],