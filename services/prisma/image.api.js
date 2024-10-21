import prisma from "@/lib/prisma";

export const getImages = async () => {
    const images = await prisma.image.findMany();
    return JSON.parse(JSON.stringify(images));
}