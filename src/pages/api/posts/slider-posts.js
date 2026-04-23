import {ERROR_CODE, SUCCESS_CODE, SUCCESS_MESSAGE} from "@/libs/constant";
import db from "@/libs/prisma/db";
import {StatusType} from "@prisma/client";

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).end();
    try {
        const posts = await db.post.findMany({
            where: {trending: true, status: StatusType.PUBLIC},
            include: {
                translations: {
                    select: {id: true, postId: true, languageCode: true, title: true, excerpt: true, quoteText: true}
                },
                author: {include: {translations: true}},
                category: {include: {translations: true}},
                tags: {include: {translations: true}},
            },
            orderBy: [{updatedAt: 'desc'}],
        });
        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: posts});
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error.message, data: []});
    }
}
