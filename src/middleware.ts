import {NextRequest, NextResponse} from "next/server";
import {getToken} from 'next-auth/jwt';
import {isTokenExpired} from "@/utils/auth";

export async function middleware(request: NextRequest) {
    // const nextAuthCookies = process.env.NODE_ENV === 'production' ? "__Secure-next-auth.session-token" : "next-auth.session-token"
    const nextAuthCookies = "next-auth.session-token"
    const {pathname} = request.nextUrl;
    const session: any = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
        cookieName: nextAuthCookies,
    }) || {};

    if (isTokenExpired(session)) {
        const response = NextResponse.next();
        response.cookies.delete(nextAuthCookies);
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
        if (session.role === 'ADMIN') {
            return NextResponse.redirect(new URL("/admin/dashboard/posts", request.url));
        }
        if (session.role === 'USER') {
            return NextResponse.redirect(new URL(`/user/dashboard/${session.id}`, request.url));
        }
    }
    //
    // if (pathname.startsWith('/admin') && session.role !== "ADMIN") {
    //     return NextResponse.redirect(new URL("/404", request.url));
    // }
    // if (pathname.startsWith('/user') && session.role !== "USER") {
    //     return NextResponse.redirect(new URL("/404", request.url));
    // }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}