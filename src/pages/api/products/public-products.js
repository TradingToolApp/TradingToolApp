import db from "@/libs/prisma/db";
import {StatusType} from "@prisma/client";
import {ERROR_CODE, SUCCESS_CODE, SUCCESS_MESSAGE} from "@/libs/constant";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return getPublicProducts(req, res);
    }
}

const getPublicProducts = async (req, res) => {
    try {
        const products = await db.product.findMany({
            where: {
                status: StatusType.PUBLIC,
            },
            include: {
                translations: true,
            },
            orderBy: {
                id: 'asc'
            }
        });

        return res.status(200).json({
            success: true,
            code: SUCCESS_CODE,
            message: SUCCESS_MESSAGE,
            data: products
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}