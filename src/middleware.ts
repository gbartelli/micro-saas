import { NextRequest, NextResponse } from "next/server";
import { getUrl } from "./lib/get-url";

export function middleware(request: NextRequest) {
  // Determinar o prefixo do cookie com base no ambiente
  const cookiePrefix = process.env.NODE_ENV === "production" ? "__Secure-" : "";
  console.log(process.env.NODE_ENV);

  // Construir o nome do cookie usando o prefixo determinado
  const cookieName = `${cookiePrefix}authjs.session-token`;

  // Obter o token do cookie usando o nome do cookie construído
  const token = request.cookies.get(cookieName);
  const pathname = request.nextUrl.pathname;

  if (pathname === "/auth" && token) {
    return NextResponse.redirect(new URL(getUrl("/app")));
  }

  if (pathname.includes("/app") && !token) {
    return NextResponse.redirect(new URL(getUrl("/auth")));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
