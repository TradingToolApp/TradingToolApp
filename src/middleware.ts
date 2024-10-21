import {NextRequest, NextResponse} from 'next/server';

export async function middleware(request: NextRequest) {
    const session = request.cookies.get('next-auth.session-token');

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