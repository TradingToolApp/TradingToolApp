import {Resend} from 'resend';
import {verificationEmailTemplate} from "./templates/email-verification-template";
import {resetPasswordTemplate} from "./templates/reset-password-template";

const resend = new Resend(process.env.RESEND_API_KEY)

const domain = process.env.NEXT_PUBLIC_DOMAIN;

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmationLink = `${domain}/auth/verify-email?token=${token}`

    await resend.emails.send({
        from: `${process.env.RESEND_FROM_EMAIL}`,
        to: email,
        subject: "Verify your email",
        html: verificationEmailTemplate(confirmationLink),
    })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/auth/reset-password?token=${token}`

    await resend.emails.send({
        from: `${process.env.RESEND_FROM_EMAIL}`,
        to: email,
        subject: "Reset your password",
        html: resetPasswordTemplate(resetLink),
    })
}