import db from "@/libs/prisma/db";
import {ERROR_CODE, SUCCESS_CODE} from "@/libs/constant";
import {generateVerificationToken} from "@/libs/resend/token";
import {sendVerificationEmail} from "@/libs/resend/mail";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            return sendVerifyEmail(req, res);
    }
}

const sendVerifyEmail = async (req, res) => {
    try {
        const {email} = req.body;

        const user = await db.user.findFirst({
            where: {
                email: email,
            },
        });

        if (!user) {
            return res.status(404).json({success: false, code: ERROR_CODE, message: "User not found!", data: []});
        }

        const verificationToken = await generateVerificationToken(email)
        await sendVerificationEmail(email, verificationToken.token);

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: "Verification email sent!", data: []});
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}