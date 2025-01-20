import {
    ApiError,
    OrdersController,
    PaymentsController,
} from "@paypal/paypal-server-sdk";
import client from '../../../libs/paypal'
import {generateSecretKey, decryptData, encryptData} from "../libs-server/cryptojs";
import moment from "moment";
import db from "@/libs/prisma/db";
import {ERROR_CODE, SUCCESS_CODE, SUCCESS_MESSAGE} from "@/libs/constant";

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
        const {orderID, user, paymentType} = req.body;
        const {jsonResponse, httpStatusCode} = await captureOrder(orderID);

        const licenseData = {
            id: user.id,
            name: user.name,
            email: user.email,
            startDate: moment().toDate(),
            endDate: paymentType === "MONTHLY" ? moment().add(30, "days").toDate() : moment().add(365, "days").toDate(),
        }
        const licenseKey = encryptData(licenseData, process.env.LICENSE_KEY_SECRET)

        const isSubscriptionExist = await db.subscription.findFirst({
            where: {
                userId: user.id,
                active: true
            }
        })

        if (isSubscriptionExist) {
            return res.status(400).json({
                success: false,
                code: ERROR_CODE,
                message: "You already have an active subscription",
                data: []
            });
        }

        const licenseObj = await db.subscription.create({
            data: {
                userId: licenseData.id,
                type: paymentType,
                startDate: licenseData.startDate,
                endDate: licenseData.endDate,
                licenseKey: licenseKey,
            }
        })

        console.log(licenseObj)
        //send license key to user email

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: licenseObj});
    } catch (error) {
        console.error("Failed to create order:", error);
        return res.status(500).json({error: "Failed to capture order."});
    }
}