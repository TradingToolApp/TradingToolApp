import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { encode, decode } from 'next-auth/jwt';

export const authOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 1 * 24 * 60 * 60, // 1 day
    },
    jwt: { encode, decode },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize( credentials ) {
                if (!credentials) return null
                const { email, password } = credentials
                if (email === process.env.ADMIN_EMAIL_TEST && password === process.env.ADMIN_PASSWORD_TEST) {
                    return { email: email, name: "admin", role: "admin" }
                } else {
                    throw new Error('Invalid credentials')
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    pages: {
        signIn: "/login",
        error: "/error",
    },
    callbacks: {
        async signIn( { user, account, profile } ) {
            if (account?.provider === "google") {
                if (profile.email === process.env.ADMIN_EMAIL) {
                    account.role = "admin";
                    return account;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        },
        async jwt({ token, user, account }) {
            token.user = user
            return token
        },
        async session({ session, token, user }) {
            session.userData = user;
            session.account = token.account;
            session.role = token.role;
            return session;
        },
        authorized({ auth }) {
            const isAuthenticated = !!auth?.user;

            return isAuthenticated;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);