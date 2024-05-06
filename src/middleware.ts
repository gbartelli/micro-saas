/* import { NextRequest, NextResponse } from 'next/server'
import { getUrl } from './lib/get-url'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('authjs.session-token')
    const pathname = request.nextUrl.pathname

    if (pathname === '/auth' && token) {
        return NextResponse.redirect(new URL(getUrl('/app')))
    }

    if (pathname.includes('/app') && !token) {
        return NextResponse.redirect(new URL(getUrl('/auth')))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
 */

/* CONFIG ANTIGA
import { NextRequest, NextResponse } from "next/server";
import { getUrl } from "./lib/get-url";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authjs.session-token");
  const pathname = request.nextUrl.pathname;
*/
/* NAO VOLTAR
    console.log({
    token: token?.value,
    pathname,
  }); NAO VOLTAR */

/* CONFIG ANTIGA
  if (pathname === "/auth" && token) {
    return NextResponse.redirect(new URL(getUrl("/app")));
  }

  if (pathname.includes("/app") && !token) {
    return NextResponse.redirect(new URL(getUrl("/auth")));
  }
}
*/
import NextAuth, { Session } from "next-auth";
import { NextRequest } from "next/server";

import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth: middleware } = NextAuth(authConfig);

export default middleware(
  (req: NextRequest & { auth: Session | null }): Response | void => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.some((route) => {
      if (route === "/") {
        return nextUrl.pathname === route;
      } else {
        return nextUrl.pathname.startsWith(route);
      }
    });

    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) return;

    if (isAuthRoute) {
      if (isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
      return;
    }

    if (!isLoggedIn && !isPublicRoute) {
      let callbackUrl = nextUrl.pathname;
      if (nextUrl.search) {
        callbackUrl += nextUrl.search;
      }

      const encodedCallbackUrl = encodeURIComponent(callbackUrl);

      return Response.redirect(
        new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
      );
    }

    return;
  }
);
export const config = {
  matcher: ["/((?!_next).*)(.+)"],
};
