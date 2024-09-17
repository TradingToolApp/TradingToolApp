import { SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE, PostStatus } from "@/lib/constant";
import prisma from "@/lib/prisma";

export default async function handler ( req, res ) {
    switch (req.method) {
        case "GET":
            return getPublicPosts(req, res);
    }
}

const getPublicPosts = async ( req, res ) => {
    try {
        const posts = await prisma.post.findMany({
            where: {
                status: "public",
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
                    updatedAt: 'desc',
                },
                {
                    id: 'asc',
                }
            ],
        });

        return res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: posts });
    } catch (error) {
        return res.status(500).json({ success: false, code: ERROR_CODE, message: error, data: [] });
    }
}