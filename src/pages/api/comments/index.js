import prisma from "@/lib/prisma";
import { SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE } from "@/lib/constant";

export default async function handler( req, res ) {
    switch (req.method) {
        case "GET":
            return getComments(req, res);
        case "POST":
            return createComment(req, res);
        case "PUT":
            return updateComment(req, res);
        case "DELETE":
            return deleteComment(req, res);
    }
}

const getComments = async ( req, res ) => {
    try {
        const comments = await prisma.comment.findMany({
            include: {
                post: {
                    select: {
                        translations: {
                            select: {
                                title: true,
                                languageCode: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                updatedAt: 'desc'
            },
        });

        return res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: comments });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, code: ERROR_CODE, message: error, data: [] });
    }
}

const createComment = async ( req, res ) => {
    try {
        const { data } = req.body;
        console.log(data)
        const newComment = await prisma.comment.create({
            data: {
                name: data.name,
                email: data.email,
                comment: data.comment,
                post: {
                    connect: {
                        slug: data.post_slug
                    }
                }
            },
        });

        return res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: newComment });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, code: ERROR_CODE, message: error, data: [] });
    }
}

const updateComment = async ( req, res ) => {
    try {
        const { data } = req.body;

        const updatedComment = await prisma.comment.update({
            where: {
                id: data.id
            },
            data: {
                reply: data.reply,
                published: data.published,
                author: {
                    connect: {
                        author_slug: data.author_slug
                    }
                }
            },
            include: {
                post: {
                    select: {
                        translations: {
                            select: {
                                title: true,
                                languageCode: true
                            }
                        }
                    }
                }
            },
        });

        return res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: updatedComment });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, code: ERROR_CODE, message: error, data: [] });
    }
}

const deleteComment = async ( req, res ) => {
    try {
        const { data } = req.body;

        await prisma.comment.delete({
            where: {
                id: data.id
            }
        });

        return res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: [] });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, code: ERROR_CODE, message: error, data: [] });
    }
}

