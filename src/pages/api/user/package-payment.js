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
            return packagePayment(req, res);
    }
}

const packagePayment = async (req, res) => {
    try {
        const {data} = req.body;
        const {productId, userId, subscriptionType} = data;

        const user = await db.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            return res.status(400).json({success: false, code: ERROR_CODE, message: "User not found", data: []});
        }

        const product = await db.package.findUnique({
            where: {
                id: productId
            }
        })

        if (!product) {
            return res.status(400).json({success: false, code: ERROR_CODE, message: "Package not found", data: []});
        }

        // Check if user had already bought this product
        const isSubscribed = await db.subscription.findMany({
            where: {
                userId: userId,
                packageId: productId,
            }
        })

        if (isSubscribed.length > 0) {
            return res.status(400).json({success: false, code: ERROR_CODE, message: "User had already bought this product", data: []});
        }

        switch (subscriptionType) {
            case SubscriptionType.MONTHLY:
                product.price = product.monthlyPrice;
                break;
            case SubscriptionType.YEARLY:
                product.price = product.yearlyPrice;
                break;
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
            subscriptionType: subscriptionType,
            startDate: moment().toDate(),
        }

        switch (subscriptionType) {
            case SubscriptionType.MONTHLY:
                licenseData.endDate = moment().add(30, "days").toDate();
                break;
            case SubscriptionType.YEARLY:
                licenseData.endDate = moment().add(365, "days").toDate();
                break;
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
                package: {
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