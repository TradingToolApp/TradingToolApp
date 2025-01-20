import db from "@/libs/prisma/db";
import {SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE} from "@/libs/constant";
import slugify from "slugify";

const APIHandler = async (req, res) => {
    switch (req.method) {
        case "GET":
            return getAuthors(req, res);
        case "POST":
            return createAuthor(req, res);
        case "PUT":
            return updateAuthor(req, res);
        case "DELETE":
            return deleteAuthor(req, res);
    }
};

const getAuthors = async (req, res) => {
    try {
        const authors = await db.author.findMany({
            include: {
                translations: true,
            },
            orderBy: {
                id: 'asc'
            }
        });

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: authors});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

const createAuthor = async (req, res) => {
    try {
        const {data} = req.body;

        const isAuthorExist = await db.author.findFirst({
            where: {
                author_slug: slugify(data.author_name, {lower: true}),
            }
        });

        if (isAuthorExist) {
            return res.status(400).json({success: false, code: ERROR_CODE, message: "Author already exist!", data: []});
        }

        const newAuthor = await db.author.create({
            data: {
                author_slug: slugify(data.author_name, {lower: true}),
                author_name: data.author_name,
                author_img: data.author_img,
                author_social: data.author_social,
                translations: {
                    create: [{
                        author_desg: data.author_desgEN,
                        author_bio: data.author_bioEN,
                        language: {connect: {code: "en"}},
                    }, {
                        author_desg: data.author_desgVI,
                        author_bio: data.author_bioVI,
                        language: {connect: {code: "vi"}},
                    }],
                }
            },
            include: {
                translations: true,
            }
        });

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: newAuthor});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

const updateAuthor = async (req, res) => {
    try {
        const {data} = req.body;

        const author = await db.author.findUnique({
            where: {
                id: data.id
            }
        });

        if (!author) {
            return res.status(404).json({success: false, code: ERROR_CODE, message: "Author not found", data: []});
        }

        const isSlugExist = await db.author.findFirst({
            where: {
                author_slug: slugify(data.author_name, {lower: true}),
                id: {
                    not: data.id
                }
            }
        });

        if (isSlugExist) {
            return res.status(400).json({success: false, code: ERROR_CODE, message: "Author already exist!", data: []});
        }

        await db.authorTranslation.update({
            where: {
                authorId_languageCode: {
                    authorId: author.id,
                    languageCode: "en"
                }
            },
            data: {
                author_desg: data.author_desgEN,
                author_bio: data.author_bioEN,
            }
        })

        await db.authorTranslation.update({
            where: {
                authorId_languageCode: {
                    authorId: author.id,
                    languageCode: "vi"
                }
            },
            data: {
                author_desg: data.author_desgVI,
                author_bio: data.author_bioVI,
            }
        })

        const updatedAuthor = await db.author.update({
            where: {
                id: author.id
            },
            data: {
                author_slug: slugify(data.author_name, {lower: true}),
                author_name: data.author_name,
                author_img: data.author_img,
                author_social: data.author_social,
            },
            include: {
                translations: true,
            }
        });

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: updatedAuthor});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

const deleteAuthor = async (req, res) => {
    try {
        const {data} = req.body;

        const author = await db.author.findUnique({
            where: {
                id: data.id
            }
        });

        if (!author) {
            return res.status(404).json({success: false, code: ERROR_CODE, message: "Author not found", data: []});
        }

        const posts = await db.post.findMany({
            where: {
                author_slug: author.author_slug
            }
        });

        if (posts.length > 0) {
            return res.status(400).json({
                success: false, code: ERROR_CODE, message: "Author is being used in some posts. Delete these posts" +
                    " first!", data: []
            });
        }

        await db.authorTranslation.deleteMany({
            where: {
                authorId: author.id
            }
        });

        const deletedAuthor = await db.author.delete({
            where: {
                id: author.id
            }
        });

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: deletedAuthor});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

export default APIHandler;