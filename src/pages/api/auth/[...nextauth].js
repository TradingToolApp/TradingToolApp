import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '@/libs/prisma/db';
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {PrismaClient} from "@prisma/client";
import {comparePassword, hashedPassword} from "../libs-server/bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 1 * 24 * 60 * 60, // 1 day
    },
    pages: {
        signIn: "/login",
        error: "/404",
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials) {
                if (!credentials) return null;
                const {email, password} = credentials

                const user = await db.user.findFirst({
                    where: {
                        email: email,
                    }
                });

                const isPasswordMatch = await comparePassword(password, user.password);

                if (!user || !isPasswordMatch) return null;
                return user;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            profile: (profile, tokens) => {
                const newUser = {
                    id: profile.sub,
                    email: profile.email,
                    emailVerified: profile.email_verified,  //somehow email_verified is not working
                    name: profile.name,
                    image: profile.picture
                }
                return newUser;
            },
        }),
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async jwt({token, user, trigger, session}) {
            if (user) {
                token.role = user.role
                token.id = user?.id
            }
            if (trigger === "update" && session) {
                token.name = session.name
            }
            return token
        },
        async session({session, token}) {
            session.user.role = token.role;
            session.user.id = token?.id;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

