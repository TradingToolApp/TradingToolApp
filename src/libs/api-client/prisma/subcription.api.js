import db from "@/libs/prisma/db";
import {ERROR_CODE} from "@/libs/constant";
import moment from "moment/moment";

export const getSubscribedUsers = async () => {
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
        return JSON.parse(JSON.stringify(data));
    } catch (e) {
        console.error(e);
        return ERROR_CODE;
    }
}

export const activateKey = async (id) => {
    try {
        const data = await db.subscription.update({
            where: {
                id
            },
            data: {
                active: true,
            }
        });
        return JSON.parse(JSON.stringify(data));
    } catch (e) {
        console.error(e);
        return ERROR_CODE;
    }
}

export const deactivateKey = async (id) => {
    try {
        const data = await db.subscription.update({
            where: {
                id
            },
            data: {
                active: false,
            }
        });
        return JSON.parse(JSON.stringify(data));
    } catch (e) {
        console.error(e);
        return ERROR_CODE;
    }
}