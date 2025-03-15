import {SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE, PostStatus} from "@/libs/constant";
import db from "@/libs/prisma/db";
import {StatusType} from "@prisma/client";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return publicPosts(req, res);
    }
}

const publicPosts = async (req, res) => {
    try {
        const posts = await db.post.findMany({
            where: {
                status: StatusType.PUBLIC,
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
            orderBy: [
                {
                    trending: 'desc',
                },
                {
                    updatedAt: 'desc',
                },
            ],
        });

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: posts});
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}