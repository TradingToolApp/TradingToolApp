import db from "@/libs/prisma/db";

export const getComments = async () => {
    const comments = await db.comment.findMany({
        include: {
            post: {
                select: {
                    translations: {
                        select: {
                            title: true,
                            languageCode: true
                        }
                    }
                }
            }
        },
        orderBy: {
            updatedAt: 'desc'
        },
    });
    return JSON.parse(JSON.stringify(comments));
}