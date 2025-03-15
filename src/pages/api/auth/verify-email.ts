import {NextApiRequest, NextApiResponse} from "next";
import db from "@/libs/prisma/db";

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    const {token} = req.query;

    if (!token) {
        return res.status(400).json({success: false, message: "Invalid token"});
    }

    try {
        const verificationToken = await db.verificationToken.findFirst({
            where: {
                token: token as any
            },
        })

        if (!verificationToken) {
            return res.status(400).json({success: false, message: "Invalid token"});
        }

        const user = await db.user.findFirst({
            where: {
                email: verificationToken.email
            },
        });

        if (!user) {
            return res.status(400).json({success: false, message: "Invalid email"});
        }

        await db.user.update({
            where: {id: user.id},
            data: {emailVerified: new Date()},
        });
        await db.verificationToken.delete({where: {id: verificationToken.id}});

        return res.status(200).json({success: true, message: "Email verified"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}

