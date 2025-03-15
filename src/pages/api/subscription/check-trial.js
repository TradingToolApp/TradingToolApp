import db from "@/libs/prisma/db";
import moment from "moment/moment";
import {SubscriptionType} from "@prisma/client";

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

        const subscription = await db.subscription.findMany({
            where: {
                userId: userId,
                productId: productId,
            }
        })

        if (subscription.length > 0) {
            const isActiveTrial = subscription.some(sub => sub.subscriptionType === SubscriptionType.TRIAL)

            if (isActiveTrial) {
                const trialEndDate = subscription.find(sub => sub.subscriptionType === SubscriptionType.TRIAL).endDate;
                return res.status(400).json({
                    success: false,
                    message: `User already registered for trial of this product, trial expiration date: ${moment(trialEndDate).format("DD/MM/YYYY HH:mm:ss")}`
                })
            }

            const isActiveSubscription = subscription.some(sub => sub.subscriptionType === SubscriptionType.LIFETIME)

            if (isActiveSubscription) {
                return res.status(400).json({
                    success: false,
                    message: 'User already has an active subscription for this product'
                })
            }
        }

        return res.status(200).json({
            success: true,
            message: `Are you sure you want to register for a trial? Trial expiration date: ${moment().add(3, "days").format("DD/MM/YYYY HH:mm:ss")}`
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
}