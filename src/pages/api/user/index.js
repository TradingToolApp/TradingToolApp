import db from "@/libs/prisma/db";
import {SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE} from "@/libs/constant";
import {hashedPassword} from "@/libs/bcrypt";
import {generateVerificationToken} from "@/libs/resend/token";
import {sendVerificationEmail} from "@/libs/resend/mail";

const handler = async (req, res) => {
    switch (req.method) {
        case "GET":
            return getUser(req, res);
        case "POST":
            return createUser(req, res);
    }
}

const getUser = async (req, res) => {
    try {
        const users = await db.user.findMany({
            include: {
                posts: true,
            },
            orderBy: {
                id: 'asc'
            }
        });

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: users});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

const createUser = async (req, res) => {
    try {
        const {data} = req.body;
        const isUserExist = await db.user.findFirst({
            where: {
                email: data.email,
            }
        });

        if (isUserExist) {
            return res.status(400).json({success: false, code: ERROR_CODE, message: "User already exist!", data: []});
        }

        const hashed = await hashedPassword(data.password);
        const newUser = await db.user.create({
            data: {
                ...data,
                password: hashed,
            }
        });

        const verificationToken = await generateVerificationToken(data.email)
        await sendVerificationEmail(data.email, verificationToken.token);

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: newUser});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

export default handler;