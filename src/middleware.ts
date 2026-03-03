import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/login", "/login/sistemas", "/"];
const AUTH_COOKIE = "credentials";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const { pathname } = request.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));

  // Tem token e está em rota pública → vai para /inicio
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Não tem token e está em rota privada → vai para /login
  if (!token && !isPublicRoute && pathname !== "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};