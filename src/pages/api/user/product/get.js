import db from "@/libs/prisma/db";
import {ERROR_CODE, SUCCESS_CODE, SUCCESS_MESSAGE} from "@/libs/constant";
import {encryptData} from "@/libs/cryptojs";

export default function handler(req, res) {
    switch (req.method) {
        case "GET":
            return getUserProduct(req, res);
    }
}

const getUserProduct = async (req, res) => {
    const {name, login} = req.query
    try {
        if (!name || !login) {
            return res.status(400).json({error: "Missing name or login"})
        }

        const jsonData = await db.subscriptionDevice.findMany({
            where: {
                name: name,
                login: login,
                user: {
                    subscriptions: {
                        some: {
                            active: true,
                            endDate: {
                                gte: new Date()
                            }
                        },
                    }
                }
            },
            select: {
                user: {
                    select: {
                        email: true,
                        subscriptions: {
                            select: {
                                id: true,
                                subscriptionType: true,
                                startDate: true,
                                endDate: true,
                                licenseKey: true,
                                active: true,
                                product: {
                                    select: {
                                        id: true,
                                        name: true,
                                        type: true,
                                        platform: true,
                                        allowedVersion: true,
                                        latestVersion: true,
                                        forceUpdateCode: true,
                                    }
                                },
                                package: {
                                    select: {
                                        id: true,
                                        name: true,
                                        type: true,
                                        platform: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        const encryptJson = encryptData(jsonData, process.env.LICENSE_KEY_SECRET);

        const data = "###!!!" + encryptJson + "!!!###"
        console.log(data);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}
