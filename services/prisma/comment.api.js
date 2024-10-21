import prisma from "@/lib/prisma";

export const getComments = async () => {
    const comments = await prisma.comment.findMany({
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