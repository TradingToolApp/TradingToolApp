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
        const {searchKeyword, limit, page} = req.query;

        const query = {
            where: {
                slug: {
                    contains: searchKeyword
                }
            },
            take: parseInt(limit),
            skip: (parseInt(page) - 1) * parseInt(limit),
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
                comments: true
            },
            orderBy: [
                {
                    trending: 'desc',
                },
                {
                    updatedAt: 'desc',
                },
            ],
        }

        const [posts, total] = await db.$transaction([
            db.post.findMany(query),
            db.post.count()
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
