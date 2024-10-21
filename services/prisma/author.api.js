import prisma from "@/lib/prisma";

export const getAuthors = async () => {
    const authors = await prisma.author.findMany({
        include: {
            translations: true,
        },
        orderBy: {
            id: 'asc'
        }
    });
    return JSON.parse(JSON.stringify(authors));
}