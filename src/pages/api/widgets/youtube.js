import db from "@/libs/prisma/db";
import {SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE} from "@/libs/constant";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return getYoutubeURLs(req, res);
        case "POST":
            return createYoutubeURL(req, res);
        case "PUT":
            return updateYoutubeURL(req, res);
        case "DELETE":
            return deleteYoutubeURL(req, res);
    }
}

const getYoutubeURLs = async (req, res) => {
    try {
        const youtubeURLs = await db.youtube.findMany({
            orderBy: {
                id: 'asc'
            }
        });

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: youtubeURLs});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

const createYoutubeURL = async (req, res) => {
    try {
        const {data} = req.body;

        const isExist = await db.youtube.findFirst({
            where: {
                videoId: data.videoUrl.split("?v=")[1]
            }
        });

        if (isExist) {
            return res.status(400).json({
                success: false,
                code: ERROR_CODE,
                message: "This video already exists",
                data: []
            });
        }

        const numberPublished = await db.youtube.count({
            where: {
                published: true
            }
        });

        if (numberPublished >= 3 && data.published) {
            return res.status(400).json({
                success: false,
                code: ERROR_CODE,
                message: "You can only have 3 published videos",
                data: []
            });
        }

        const newYoutubeURL = await db.youtube.create({
            data: {
                videoId: data.videoUrl.split("?v=")[1],
                title: data.title,
                videoUrl: data.videoUrl,
                embedUrl: "https://www.youtube.com/embed/" + data.videoUrl.split("?v=")[1],
                published: data.published,
            }
        });

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: newYoutubeURL});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

const updateYoutubeURL = async (req, res) => {
    try {
        const {data} = req.body;

        const numberPublished = await db.youtube.count({
            where: {
                published: true,
                id: {
                    not: data.id
                }
            }
        });

        if (numberPublished >= 3 && data.published) {
            return res.status(400).json({
                success: false,
                code: ERROR_CODE,
                message: "You can only have 3 published videos",
                data: []
            });
        }

        const updatedYoutubeURL = await db.youtube.update({
            where: {
                id: data.id
            },
            data: {
                videoId: data.videoUrl.split("?v=")[1],
                title: data.title,
                videoUrl: data.videoUrl,
                embedUrl: "https://www.youtube.com/embed/" + data.videoUrl.split("?v=")[1],
                published: data.published,
            }
        });

        return res.status(200).json({
            success: true,
            code: SUCCESS_CODE,
            message: SUCCESS_MESSAGE,
            data: updatedYoutubeURL
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

const deleteYoutubeURL = async (req, res) => {
    try {
        const {data} = req.body;

        await db.youtube.delete({
            where: {
                id: data.id
            }
        });

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: []});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

