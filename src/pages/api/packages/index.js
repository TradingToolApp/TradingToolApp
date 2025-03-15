import db from "@/libs/prisma/db";
import {SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE} from "@/libs/constant";
import {Prisma} from '@prisma/client'

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return getPackages(req, res);
        case "PUT":
            return updatePackage(req, res);
    }
};

const getPackages = async (req, res) => {
    try {
        const packages = await db.package.findMany({
            include: {
                translations: true,
            },
            orderBy: {
                id: 'asc'
            }
        });

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: packages});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

const updatePackage = async (req, res) => {
    const {data} = req.body;

    try {
        const updatedPackage = await db.package.update({
            where: {
                id: data.id,
            },
            data: {
                name: data.name,
                image: data.image,
                platform: data.platform,
                urlPost: data.urlPost,
                urlDownload: data.urlDownload,
                monthlyPrice: data.monthlyPrice,
                originalMonthlyPrice: data.originalMonthlyPrice,
                yearlyPrice: data.yearlyPrice,
                originalYearlyPrice: data.originalYearlyPrice,
                monthlyPriceByYearlyPrice: (parseInt(data.originalYearlyPrice) / 12).toString(),
                status: data.status,
                active: data.active,
                translations: {
                    upsert: [
                        {
                            where: {
                                packageId_languageCode: {
                                    packageId: data.id,
                                    languageCode: "en"
                                }
                            },
                            update: {
                                description: data.description_EN,
                            },
                            create: {
                                description: data.description_EN,
                                language: {connect: {code: "en"}}
                            }
                        },
                        {
                            where: {
                                packageId_languageCode: {
                                    packageId: data.id,
                                    languageCode: "vi"
                                }
                            },
                            update: {
                                description: data.description_VI,
                            },
                            create: {
                                description: data.description_VI,
                                language: {connect: {code: "en"}}
                            }
                        }
                    ]
                },
            },
        });

        return res.status(200).json({
            success: true,
            code: SUCCESS_CODE,
            message: SUCCESS_MESSAGE,
            data: updatedPackage
        });
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}