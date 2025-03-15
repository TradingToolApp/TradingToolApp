import {SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE} from "@/libs/constant";
import db from "@/libs/prisma/db";
import slugify from "slugify";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return postBySlug(req, res);
    }
}

const postBySlug = async (req, res) => {
    try {
        const {slug} = req.query;
        const post = await db.post.findFirst({
            where: {
                slug: slug,
            },
            include: {
                translations: true,
                tags: {
                    include: {
                        translations: true,
                    }
                },
                author: {
                    include: {
                        translations: true,
                    }
                },
                category: {
                    include: {
                        translations: true,
                    }
                },
            },
        });

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: post});
    } catch (error) {
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}