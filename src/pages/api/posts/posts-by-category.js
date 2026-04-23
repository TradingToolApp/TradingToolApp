import {ERROR_CODE, SUCCESS_CODE, SUCCESS_MESSAGE} from "@/libs/constant";
import db from "@/libs/prisma/db";
import {StatusType} from "@prisma/client";

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).end();
    try {
        const {cate_slug, limit = 8, page = 1} = req.query;

        if (!cate_slug) {
            return res.status(400).json({success: false, code: ERROR_CODE, message: 'cate_slug is required', data: []});
        }

        const where = {
            status: StatusType.PUBLIC,
            category: {cate_slug},
        };

        const [posts, total, category] = await Promise.all([
            db.post.findMany({
                where,
                take: parseInt(limit),
                skip: (parseInt(page) - 1) * parseInt(limit),
                include: {
                    translations: {
                        select: {id: true, postId: true, languageCode: true, title: true, excerpt: true, quoteText: true}
                    },
                    author: {include: {translations: true}},
                    category: {include: {translations: true}},
                    tags: {include: {translations: true}},
                },
                orderBy: [{trending: 'desc'}, {updatedAt: 'desc'}],
            }),
            db.post.count({where}),
            db.category.findFirst({
                where: {cate_slug},
                include: {translations: true},
            }),
        ]);

        return res.status(200).json({
            success: true,
            code: SUCCESS_CODE,
            message: SUCCESS_MESSAGE,
            data: {posts, total, category}
        });
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error.message, data: []});
    }
}
