import db from "@/libs/prisma/db";
import {SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE} from "@/libs/constant";
import slugify from "slugify";
import {Prisma} from "@prisma/client";

const APIHandler = async (req, res) => {
    switch (req.method) {
        case "GET":
            return getCategories(req, res);
        case "POST":
            return createCategory(req, res);
        case "PUT":
            return updateCategory(req, res);
        case "DELETE":
            return deleteCategory(req, res);
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await db.category.findMany({
            include: {
                translations: true,
            },
            orderBy: {
                id: 'asc'
            }
        });

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: categories});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: true, code: ERROR_CODE, message: error, data: []});
    }
}

const createCategory = async (req, res) => {
    try {
        const {data} = req.body;

        const newCategory = await db.category.create({
            data: {
                cate_slug: slugify(data.cateEN.toLowerCase()),
                cate_bg: data.cate_bg,
                cate_img: data.cate_img,
                translations: {
                    create: [{
                        cate: data.cateEN,
                        description: data.descriptionEN,
                        language: {connect: {code: "en"}},
                    }, {
                        cate: data.cateVI,
                        description: data.descriptionVI,
                        language: {connect: {code: "vi"}},
                    }],
                }
            },
            include: {
                translations: true,
            },
        });

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: newCategory});
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return res.status(400).json({
                    success: false,
                    code: ERROR_CODE,
                    message: 'This category already exists or name EN, name VI are the same! Please try another name!',
                    data: []
                });
            }
        }
        console.log(error.code);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

const updateCategory = async (req, res) => {
    try {
        const {data} = req.body;

        const category = await db.category.findUnique({
            where: {
                id: data.id
            }
        });

        if (!category) {
            return res.status(404).json({success: false, code: ERROR_CODE, message: "Category not found!", data: []});
        }

        await db.categoryTranslation.update({
            where: {
                categoryId_languageCode: {
                    categoryId: category.id,
                    languageCode: "en"
                }
            },
            data: {
                cate: data.cateEN,
                description: data.descriptionEN,
            }
        })

        await db.categoryTranslation.update({
            where: {
                categoryId_languageCode: {
                    categoryId: category.id,
                    languageCode: "vi"
                }
            },
            data: {
                cate: data.cateVI,
                description: data.descriptionVI,
            }
        })

        const updatedCategory = await db.category.update({
            where: {
                id: category.id
            },
            data: {
                cate_slug: slugify(data.cateEN.toLowerCase()),
                cate_bg: data.cate_bg,
                cate_img: data.cate_img,
            },
            include: {
                translations: true,
            },
        });

        return res.status(200).json({
            success: true,
            code: SUCCESS_CODE,
            message: SUCCESS_MESSAGE,
            data: updatedCategory
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return res.status(400).json({
                    success: false,
                    code: ERROR_CODE,
                    message: 'This category already exists or name EN, name VI are the same! Please try another name!',
                    data: []
                });
            }
        }
        console.log(error.code);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

const deleteCategory = async (req, res) => {
    try {
        const {data} = req.body;

        const category = await db.category.findUnique({
            where: {
                id: data.id
            }
        });

        if (!category) {
            return res.status(404).json({success: false, code: ERROR_CODE, message: "Category not found", data: []});
        }

        const posts = await db.post.findMany({
            where: {
                cate_slug: category.cate_slug
            }
        });

        if (posts.length > 0) {
            return res.status(400).json({
                success: false, code: ERROR_CODE, message: "Category is being used in some posts. Delete these posts" +
                    " first!", data: []
            });
        }

        await db.categoryTranslation.deleteMany({
            where: {
                categoryId: category.id
            }
        });

        const deletedCategory = await db.category.delete({
            where: {
                id: category.id
            }
        });

        return res.status(200).json({
            success: true,
            code: SUCCESS_CODE,
            message: SUCCESS_MESSAGE,
            data: deletedCategory
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

export default APIHandler;