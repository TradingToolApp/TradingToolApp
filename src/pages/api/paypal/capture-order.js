import {
    ApiError,
    OrdersController,
    PaymentsController,
} from "@paypal/paypal-server-sdk";
import client from '@/libs/paypal'
import {encryptData} from "@/libs/cryptojs";
import moment from "moment";
import db from "@/libs/prisma/db";
import {SUCCESS_CODE, SUCCESS_MESSAGE} from "@/libs/constant";
import {ProductType, SubscriptionType} from "@prisma/client";

const ordersController = new OrdersController(client);
const paymentsController = new PaymentsController(client);

const captureOrder = async (orderID) => {
    const collect = {
        id: orderID,
        prefer: "return=minimal",
    };

    try {
        const {body, ...httpResponse} = await ordersController.ordersCapture(
            collect
        );
        // Get more response info...
        // const { statusCode, headers } = httpResponse;
        return {
            jsonResponse: JSON.parse(body),
            httpStatusCode: httpResponse.statusCode,
        };
    } catch (error) {
        if (error instanceof ApiError) {
            // const { statusCode, headers } = error;
            throw new Error(error.message);
        }
    }
};

export default async function Handler(req, res) {
    if (req.method !== "POST")
        return res.status(404).json({success: false, message: "Not Found"})
    if (!req.body.orderID)
        return res.status(400).json({success: false, message: "Please Provide Order ID"})

    try {
        const {orderID, user, product} = req.body;
        const {jsonResponse, httpStatusCode} = await captureOrder(orderID);

        let licenseData = {
            userId: user.id,
            productId: product.id,
            name: user.name,
            email: user.email,
            subscriptionType: product.subscriptionType,
            startDate: moment().toDate(),
        }

        switch (product.subscriptionType) {
            case SubscriptionType.MONTHLY:
                licenseData.endDate = moment().add(30, "days").toDate();  //when user buy a package
                break;
            case SubscriptionType.YEARLY:
                licenseData.endDate = moment().add(365, "days").toDate();  //when user buy a package
                break;
            case SubscriptionType.LIFETIME:
                licenseData.endDate = moment().add(1000, "years").toDate();  //when user buy a product
                break;
        }

        const licenseKey = encryptData(licenseData, process.env.LICENSE_KEY_SECRET)

        const isBuyingPackage = [ProductType.EA_PRO, ProductType.INDI_PRO, ProductType.PLUS].includes(product.type)
        let subscription;

        if (isBuyingPackage) {
            subscription = await db.subscription.create({
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
        } else {
            subscription = await db.subscription.create({
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
        }

        //send license key to user email

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: subscription});
    } catch (error) {
        console.error("Failed to create order:", error.stack);
        return res.status(500).json({error: "Failed to capture order."});
    }
}