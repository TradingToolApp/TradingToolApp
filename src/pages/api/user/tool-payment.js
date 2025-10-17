import db from "@/libs/prisma/db";
import {SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE} from "@/libs/constant";
import {hashedPassword} from "@/libs/bcrypt";
import {generateVerificationToken} from "@/libs/resend/token";
import {sendVerificationEmail} from "@/libs/resend/mail";
import moment from "moment/moment";
import {ProductType, SubscriptionType} from "@prisma/client";
import {encryptData} from "@/libs/cryptojs";

const handler = async (req, res) => {
    switch (req.method) {
        case "POST":
            return toolPayment(req, res);
    }
}

const toolPayment = async (req, res) => {
    try {
        const {data} = req.body;
        const {productId, userId} = data;

        const user = await db.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            return res.status(400).json({success: false, code: ERROR_CODE, message: "User not found", data: []});
        }

        const product = await db.product.findUnique({
            where: {
                id: productId
            }
        })

        if (!product) {
            return res.status(400).json({success: false, code: ERROR_CODE, message: "Product not found", data: []});
        }

        // Check if user had already bought this product
        const isSubscribed = await db.subscription.findMany({
            where: {
                userId: userId,
                productId: productId,
            }
        })

        if (isSubscribed.length > 0) {
            return res.status(400).json({success: false, code: ERROR_CODE, message: "User had already bought this product", data: []});
        }

        // Check if user's credit is enough
        if (user.credit < product.price) {
            return res.status(400).json({success: false, code: ERROR_CODE, message: "User's credit is not enough", data: []});
        }

        // Deduct user's credit
        await db.user.update({
            where: {
                id: userId
            },
            data: {
                credit: {
                    decrement: parseInt(product.price)
                }
            }
        })


        // Create subscription
        let licenseData = {
            userId: user.id,
            productId: product.id,
            name: user.name,
            email: user.email,
            subscriptionType: SubscriptionType.LIFETIME,
            startDate: moment().toDate(),
            endDate: moment().add(1000, "years").toDate()
        }

        const licenseKey = encryptData(JSON.stringify(licenseData), process.env.LICENSE_KEY_SECRET)

        const subscription = await db.subscription.create({
            data: {
                subscriptionType: licenseData.subscriptionType,
                startDate: licenseData.startDate,
                endDate: licenseData.endDate,
                licenseKey: licenseKey,
                user: {
                    connect: {id: user.id},
                },
                product: {
                    connect: {id: product.id},
                },
            }
        })

        //send license key to user email

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: {subscription}});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

export default handler;