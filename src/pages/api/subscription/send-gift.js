import db from "@/libs/prisma/db";
import {SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE} from "@/libs/constant";
import {sendGiftEmail, sendVerificationEmail} from "@/libs/resend/mail";
import {generateRandomCode} from "@/libs/cryptojs";
import {CodeType} from "@prisma/client";

const handler = async (req, res) => {
    switch (req.method) {
        case "POST":
            return sendGift(req, res);
    }
}

const sendGift = async (req, res) => {

    try {
        const {data} = req.body;
        const user = await db.user.findUnique({where: {id: data.userId}});
        if (!user) {
            return res.status(ERROR_CODE).json({message: "User not found"});
        }

        const gift = await db.code.create({
            data: {
                amount: parseInt(data.amount),
                type: CodeType.GIFT,
                code : generateRandomCode(),
                used: true,
            }
        });

        const updateCredit = await db.user.update({
            where: {
                id: data.userId
            },
            data: {
                credit: {
                    increment: parseInt(data.amount)
                }
            }
        })

        await sendGiftEmail(data.email, data.amount);

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: gift});
    } catch (err) {
        console.log(err)
        return res.status(400).json({success: false, code: ERROR_CODE, message: err.message});
    }
}

export default handler;