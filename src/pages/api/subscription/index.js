import db from "@/libs/prisma/db";
import {SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE} from "@/libs/constant";
import moment from "moment";

const handler = async (req, res) => {
    switch (req.method) {
        case "GET":
            return getSubscribedUsers(req, res);
    }
}

const getSubscribedUsers = async (req, res) => {
    try {
        const subscribedUsers = await db.subscription.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        phone: true,
                    }
                },
                product: true,
                package: true
            },
            orderBy: [
                {endDate: "asc"},
                {active: "asc"}
            ]
        });

        return res.status(200).json({
            success: true,
            code: SUCCESS_CODE,
            message: SUCCESS_MESSAGE,
            data: subscribedUsers
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

export default handler;