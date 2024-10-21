import prisma from "@/lib/prisma";

export const getYoutubeWidgetData = async () => {
    const youtubeURLs = await prisma.youtube.findMany({
        orderBy: {
            id: 'asc'
        }
    });
    return JSON.parse(JSON.stringify(youtubeURLs));
}