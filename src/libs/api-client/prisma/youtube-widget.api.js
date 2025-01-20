import db from "@/libs/prisma/db";

export const getYoutubeWidgetData = async () => {
    const youtubeURLs = await db.youtube.findMany({
        orderBy: {
            id: 'asc'
        }
    });
    return JSON.parse(JSON.stringify(youtubeURLs));
}