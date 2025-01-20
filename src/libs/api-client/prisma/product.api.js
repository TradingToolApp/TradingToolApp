import db from "@/libs/prisma/db";

export const getProducts = async () => {
    const products = await db.product.findMany({
        include: {
            translations: true,
        },
        orderBy: {
            id: 'asc'
        }
    });
    return JSON.parse(JSON.stringify(products));
}