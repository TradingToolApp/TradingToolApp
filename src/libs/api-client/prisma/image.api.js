import db from "@/libs/prisma/db";

export const getImages = async () => {
    const images = await db.image.findMany();
    return JSON.parse(JSON.stringify(images));
}