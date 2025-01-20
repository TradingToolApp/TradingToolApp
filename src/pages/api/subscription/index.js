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
                }
            },
            orderBy: [
                {endDate: "asc"},
                {active: "asc"}
            ]
        });

        const data = subscribedUsers.map((element) => {
            return {
                id: element.id,
                userId: element.userId,
                type: element.type,
                startDate: moment(element.startDate).format("DD-MM-YYYY"),
                endDate: moment(element.endDate).format("DD-MM-YYYY"),
                registeredDevices: element.registeredDevices,
                active: element.active,
                name: element.user.name,
                email: element.user.email,
                phone: element.user.phone,
            }
        })
        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: data});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

export default handler;