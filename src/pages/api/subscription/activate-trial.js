import db from "@/libs/prisma/db";
import moment from "moment/moment";
import {SubscriptionType} from "@prisma/client";
import {encryptData} from "@/libs/cryptojs";
import {SUCCESS_CODE} from "@/libs/constant";

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(404).json({success: false, message: 'Not Found'})
    if (!req.body.userId || !req.body.productId) return res.status(400).json({
        success: false,
        message: 'Please Provide User ID and Product ID'
    })

    try {
        const {userId, productId} = req.body
        const user = await db.user.findUnique({where: {id: userId}})
        if (!user) return res.status(404).json({success: false, message: 'User Not Found'})

        const licenseData = {
            userId: user.id,
            productId: productId,
            name: user.name,
            email: user.email,
            subscriptionType: SubscriptionType.TRIAL,
            startDate: moment().toDate(),
            endDate: moment().add(3, "days").toDate(),
        }
        const licenseKey = encryptData(licenseData, process.env.LICENSE_KEY_SECRET)

        const activateTrial = await db.subscription.create({
            data: {
                subscriptionType: licenseData.subscriptionType,
                startDate: licenseData.startDate,
                endDate: licenseData.endDate,
                licenseKey: licenseKey,
                user: {
                    connect: {id: userId},
                },
                product: {
                    connect: {id: productId},
                },
            },
        })


        return res.status(200).json({
            success: true,
            code: SUCCESS_CODE,
            message: `Trial Activated! Trial will end on ${moment(licenseData.endDate).format("DD/MM/YYYY HH:mm:ss")}`,
            data: activateTrial
        })
    } catch (error) {
        console.error('Error:', error.stack);
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
}