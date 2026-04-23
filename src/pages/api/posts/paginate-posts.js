import db from "@/libs/prisma/db";
import {ERROR_CODE, SUCCESS_CODE, SUCCESS_MESSAGE} from "@/libs/constant";

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getPaginatePosts(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

const getPaginatePosts = async (req, res) => {
    try {
        const {searchKeyword, limit, page, status} = req.query;

        const where = {
            slug: {contains: searchKeyword ?? ''},
            ...(status ? {status} : {}),
        };

        const query = {
            where,
            take: parseInt(limit),
            skip: (parseInt(page) - 1) * parseInt(limit),
            include: {
                translations: status === 'PUBLIC'
                    ? {select: {id: true, postId: true, languageCode: true, title: true, excerpt: true, quoteText: true}}
                    : true,
                tags: {include: {translations: true}},
                author: {include: {translations: true}},
                category: {include: {translations: true}},
            },
            orderBy: [
                {trending: 'desc'},
                {updatedAt: 'desc'},
            ],
        };

        const [posts, total] = await db.$transaction([
            db.post.findMany(query),
            db.post.count({where}),
        ]);
        return res.status(200).json({
            success: true,
            code: SUCCESS_CODE,
            message: SUCCESS_MESSAGE,
            data: {posts, total}
        });
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: true, code: ERROR_CODE, message: error, data: []});
    }
}
