import db from "@/libs/prisma/db";
import {StatusType} from "@prisma/client";

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


export const getPublicProducts = async () => {
    const products = await db.product.findMany({
        where: {
            status: StatusType.PUBLIC,
        },
        include: {
            translations: true,
        },
        orderBy: {
            id: 'asc'
        }
    });
    return JSON.parse(JSON.stringify(products));
}