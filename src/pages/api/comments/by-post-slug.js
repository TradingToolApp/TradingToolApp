import db from "@/libs/prisma/db";
import {SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE} from "@/libs/constant";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return getCommentByPostSlug(req, res);
    }
}

const getCommentByPostSlug = async (req, res) => {
    try {
        const {slug} = req.query;
        const comments = await db.comment.findMany({
            where: {
                published: true,
                post_slug: slug
            },
            orderBy: {
                updatedAt: 'desc'
            },
        });

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: comments});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

