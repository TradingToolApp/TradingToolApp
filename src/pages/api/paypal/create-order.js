import client from '@/libs/paypal'

import {
    ApiError,
    OrdersController,
} from "@paypal/paypal-server-sdk";

const ordersController = new OrdersController(client);

const createOrder = async (user, price) => {
    const collect = {
        body: {
            intent: "CAPTURE",
            purchaseUnits: [
                {
                    amount: {
                        currencyCode: "USD",
                        value: price.toString(),
                    },
                },
            ],
        },
        prefer: "return=minimal",
    };

    try {
        const {body, ...httpResponse} = await ordersController.ordersCreate(
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
    if (!req.body.user || !req.body.product)
        return res.status(400).json({success: false, message: "Please Provide product And User ID"})

    try {
        // use the cart information passed from the front-end to calculate the order amount detals
        const {user, product} = req.body;
        const {jsonResponse, httpStatusCode} = await createOrder(user, product.price);
        return res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).json({error: 'Some Error Occurred!'});
    }
}