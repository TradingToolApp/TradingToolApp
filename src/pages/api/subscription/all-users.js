import db from "@/libs/prisma/db";
import {SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE} from "@/libs/constant";
import moment from "moment";

const handler = async (req, res) => {
    switch (req.method) {
        case "GET":
            return getAllUsers(req, res);
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await db.user.findMany({
            where: {
                role: "USER",
            },
            orderBy: [
                {name: "asc"},
            ]
        });

        return res.status(200).json({
            success: true,
            code: SUCCESS_CODE,
            message: SUCCESS_MESSAGE,
            data: users
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

export default handler;