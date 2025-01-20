import db from "@/libs/prisma/db";

export const getTags = async () => {
    const tags = await db.tag.findMany({
        include: {
            translations: true,
        },
        orderBy: {
            id: 'asc'
        }
    });
    return JSON.parse(JSON.stringify(tags));
}