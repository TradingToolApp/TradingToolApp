import db from "@/libs/prisma/db";

export const getAuthors = async () => {
    const authors = await db.author.findMany({
        include: {
            translations: true,
        },
        orderBy: {
            id: 'asc'
        }
    });
    return JSON.parse(JSON.stringify(authors));
}