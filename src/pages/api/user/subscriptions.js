import db from "@/libs/prisma/db";
import {Prisma} from "@prisma/client";
import {ERROR_CODE} from "@/libs/constant";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return getUserSubscriptionsById(req, res);
    }
}

const getUserSubscriptionsById = async (req, res) => {
    const {id} = req.query

    try {
        if (!id) {
            return res.status(400).json({success: false, message: "Missing user id"})
        }

        const devices = await db.subscriptionDevice.findMany({
            where: {
                userId: id
            },
            select: {
                id: true,
                name: true,
                login: true,
            },
            orderBy: {
                createdAt: "asc"
            }
        });

        const subscriptions = await db.subscription.findMany({
            where: {
                userId: id,
                endDate: {
                    gte: new Date()
                },
                active: true
            },
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
                        platform: true
                    }
                },
                package: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
                        platform: true
                    }
                }
            },
            orderBy: {
                id: "asc"
            }
        })

        const products = subscriptions.filter(sub => sub.productId !== null)
        const packages = subscriptions.filter(sub => sub.packageId !== null)

        return res.status(200).json({success: true, data: {devices, products, packages}})
    } catch (error) {

        console.error(error.stack)
        return res.status(500).json({success: false, message: "Internal server error"})
    }
}