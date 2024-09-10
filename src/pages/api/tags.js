import prisma from "@/lib/prisma";
import { SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE } from "@/lib/constant";
import slugify from "slugify";

const APIHandler = async ( req, res ) => {
    switch (req.method) {
        case "GET":
            return getTags(req, res);
        case "POST":
            return createTag(req, res);
        case "PUT":
            return updateTag(req, res);
        case "DELETE":
            return deleteTag(req, res);
    }
};

const getTags = async ( req, res ) => {
    try {
        const tags = await prisma.tag.findMany({
            include: {
                translations: true,
            },
            orderBy: {
                id: 'asc'
            }
        });

        return res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: tags });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, code: ERROR_CODE, message: error, data: [] });
    }
}

const createTag = async ( req, res ) => {
    try {
        const { data } = req.body;

        const isTagExist = await prisma.tag.findFirst({
            where: {
                tag_slug: slugify(data.tagEN, { lower: true }),
            }
        });

        if (isTagExist) {
            return res.status(400).json({ success: false, code: ERROR_CODE, message: "Tag already exist!", data: [] });
        }

        const newTag = await prisma.tag.create({
            data: {
                tag_slug: slugify(data.tagEN, { lower: true }),
                translations: {
                    create: [ {
                        tag: data.tagEN,
                        language: { connect: { code: "en" } },
                    }, {
                        tag: data.tagVI,
                        language: { connect: { code: "vi" } },
                    } ],
                }
            },
            include: {
                translations: true,
            },
        });

        return res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: newTag });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, code: ERROR_CODE, message: error, data: [] });
    }
}

const updateTag = async ( req, res ) => {
    try {
        const { data } = req.body;

        const tag = await prisma.tag.findUnique({
            where: {
                tag_slug: data.tag_slug,
            }
        });

        if (!tag) {
            return res.status(404).json({ success: false, code: ERROR_CODE, message: "Tag not found", data: [] });
        }

        const posts = await prisma.post.findMany({
            where: {
                tags: {
                    some: {
                        id: tag.id
                    }
                }
            }
        });

        if (posts.length > 0) {
            return res.status(400).json({ success: false, code: ERROR_CODE, message: "Tag is being used in some posts!", data: [] });
        }

        const isSlugExist = await prisma.tag.findFirst({
            where: {
                tag_slug: slugify(data.tagEN, { lower: true }),
                id: {
                    not: tag.id
                }
            }
        });

        if (isSlugExist) {
            return res.status(400).json({ success: false, code: ERROR_CODE, message: "Tag already exist!", data: [] });
        }

        await prisma.tagTranslation.update({
            where: {
                tagId_languageCode: {
                    tagId: tag.id,
                    languageCode: "en"
                }
            },
            data: {
                tag: data.tagEN,
            }
        })

        await prisma.tagTranslation.update({
            where: {
                tagId_languageCode: {
                    tagId: tag.id,
                    languageCode: "vi"
                }
            },
            data: {
                tag: data.tagVI,
            }
        })

        const updatedTag = await prisma.tag.update({
            where: {
                id: tag.id
            },
            data: {
                tag_slug: slugify(data.tagEN, { lower: true }),
            },
            include: {
                translations: true,
            },
        });

        return res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: updatedTag });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, code: ERROR_CODE, message: error, data: [] });
    }
}

const deleteTag = async ( req, res ) => {
    try {
        const { data } = req.body;

        const tag = await prisma.tag.findUnique({
            where: {
                id: data.id,
            }
        });

        if (!tag) {
            return res.status(404).json({ success: false, code: ERROR_CODE, message: "Tag not found", data: [] });
        }

        await prisma.tagTranslation.deleteMany({
            where: {
                tagId: tag.id
            }
        });

        const deletedTag = await prisma.tag.delete({
            where: {
                id: tag.id
            }
        });

        return res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: deletedTag });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, code: ERROR_CODE, message: error, data: [] });
    }
}

export default APIHandler;