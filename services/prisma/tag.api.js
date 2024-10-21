import prisma from "@/lib/prisma";

export const getTags = async () => {
    const tags = await prisma.tag.findMany({
        include: {
            translations: true,
        },
        orderBy: {
            id: 'asc'
        }
    });
    return JSON.parse(JSON.stringify(tags));
}