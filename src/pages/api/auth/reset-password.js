import db from "@/libs/prisma/db"
import {hashedPassword} from "@/libs/bcrypt";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const {password, token} = req.body;

        if (!password || !token) {
            return res.status(400).json({success: false, message: "Password and token are required!"});
        }

        const resetToken = await db.verificationToken.findFirst({where: {token: token}});

        if (!resetToken) {
            return res.status(400).json({success: false, message: "Invalid token!"});
        }

        const hashed = await hashedPassword(password);

        await db.user.update({where: {email: resetToken.email}, data: {password: hashed}});
        await db.verificationToken.delete({where: {id: resetToken.id}});

        return res.status(200).json({success: true, message: "Password reset successful!"});
    }

    return res.status(405).json({success: false, message: "Method not allowed!"});
}