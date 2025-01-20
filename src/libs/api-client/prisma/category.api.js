import db from "@/libs/prisma/db";

export const getCategories = async () => {
    const categories = await db.category.findMany({
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
    const category = await db.category.findFirst({
        where: {},
        include: {
            translations: true,
        },
        orderBy: {
            id: 'asc'
        }
    });
    return JSON.parse(JSON.stringify(category));
}