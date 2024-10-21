import {NextRequest, NextResponse} from 'next/server';

export async function middleware(request: NextRequest) {
    const nameCookies = process.env.NODE_ENV === 'production' ? "__Secure-next-auth.session-token" : "next-auth.session-token"
    const session = request.cookies.get(nameCookies);

    const {pathname} = request.nextUrl;

    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
        if (session) {
            return NextResponse.redirect(new URL('/admin/dashboard/posts', request.url));
        }
    }

    if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
        if (!session) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};