import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
// const bcrypt = require("bcrypt");

const authOptions = {
    // ... Other options ...

    providers: [
        // CredentialsProvider({
        //     name: "Credentials",
        //     async authorize(credentials, req) {
        //         await dbConnect();
        //         const user = await User.findOne({ email: credentials.email });
        //         if (user) {
        //             // Handling traditional email/password authentication
        //             // ... [Code for email/password authentication] ...
        //         } else {
        //             return null;
        //         }
        //     },
        // }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
    ],
    callbacks: {
        // ... Other callbacks ...

        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                // Handling Gmail authentication
                // ... [Code for creating user account after successful Gmail authentication] ...
                console.log(account)
                if (profile.email === process.env.ADMIN_EMAIL) {
                    return account;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        },
        async jwt({ token, user, account }) {
            if (account) {
                token.account = account;
                token.role = "admin"
            }
            return token;
        },
        async session({ session, token, user }) {
            session.account = token.account;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    // ... Other options ...
};

export default NextAuth(authOptions);
