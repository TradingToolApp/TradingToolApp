import {sendPasswordResetEmail} from "@/libs/resend/mail";
import {generateVerificationToken} from "@/libs/resend/token";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const {email} = req.body;

        if (!email) {
            return res.status(400).json({success: false, message: "Email is required!"});
        }

        const resetToken = await generateVerificationToken(email);
        await sendPasswordResetEmail(email, resetToken.token);

        return res.status(200).json({success: true, message: "Please check your email box!"});
    }
}
