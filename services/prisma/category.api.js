import prisma from "@/lib/prisma";

export const getCategories = async () => {
    const categories = await prisma.category.findMany({
        include: {
            translations: true,
        },
        orderBy: {
            id: 'asc'
        }
    });
    return JSON.parse(JSON.stringify(categories));
}

export const getCategoryBySlug = async (slug) => {
    const category = await prisma.category.findFirst({
        where: {

        },
        include: {
            translations: true,
        },
        orderBy: {
            id: 'asc'
        }
    });
    return JSON.parse(JSON.stringify(category));
}