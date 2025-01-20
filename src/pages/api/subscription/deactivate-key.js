import db from "@/libs/prisma/db";
import {ERROR_CODE, SUCCESS_CODE, SUCCESS_MESSAGE} from "@/libs/constant";

const handler = async (req, res) => {
    switch (req.method) {
        case "PUT":
            return deactivateKey(req, res);
    }
}

const deactivateKey = async (req, res) => {
    try {
        const {id} = req.body;
        const data = await db.subscription.update({
            where: {
                id
            },
            data: {
                active: false,
            }
        });

        return res.status(200).json({
            success: true,
            code: SUCCESS_CODE,
            message: SUCCESS_MESSAGE,
            data: data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

export default handler;