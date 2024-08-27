import prisma from "@/lib/prisma";
import { SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE } from "@/lib/constant";
import slugify from "slugify";

const APIHandler = async ( req, res ) => {
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

const getCategories = async ( req, res ) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                translations: true,
            },
            orderBy: {
                id: 'asc'
            }
        });

        return res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: categories });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: true, code: ERROR_CODE, message: error, data: [] });
    }
}

const createCategory = async ( req, res ) => {
    try {
        const { data } = req.body;

        const isCategoryExist = await prisma.category.findFirst({
            where: {
                cate_slug: slugify(data.cateEN, { lower: true }),
            }
        });

        if(isCategoryExist) {
            return res.status(400).json({ success: false, code: ERROR_CODE, message: "Category already exist!", data: [] });
        }

        const newCategory = await prisma.category.create({
            data: {
                cate_slug: slugify(data.cateEN.toLowerCase()),
                cate_bg: data.cate_bg,
                cate_img: data.cate_img,
                translations: {
                    create: [ {
                        cate: data.cateEN,
                        description: data.descriptionEN,
                        language: { connect: { code: "en" } },
                    }, {
                        cate: data.cateVI,
                        description: data.descriptionVI,
                        language: { connect: { code: "vi" } },
                    } ],
                }
            }
        });

        return res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: newCategory });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, code: ERROR_CODE, message: error, data: [] });
    }
}

const updateCategory = async ( req, res ) => {
    try {
        const { data } = req.body;

        const category = await prisma.category.findUnique({
            where: {
                cate_slug: data.cate_slug
            }
        });

        if(!category) {
            return res.status(404).json({ success: false, code: ERROR_CODE, message: "Category not found", data: [] });
        }

        await prisma.categoryTranslation.update({
            where: {
                categoryId_languageCode: {
                    categoryId: category.id,
                    languageCode: "en"
                }
            },
            data: {
                cate: data.cateEN,
                description: data.excerptEN,
            }
        })

        await prisma.categoryTranslation.update({
            where: {
                categoryId_languageCode: {
                    categoryId: category.id,
                    languageCode: "vi"
                }
            },
            data: {
                cate: data.cateVI,
                description: data.excerptVI,
            }
        })

        const updatedCategory = await prisma.category.update({
            where: {
                id: category.id
            },
            data: {
                cate_slug: slugify(data.cateEN.toLowerCase()),
                cate_bg: data.cate_bg,
                cate_img: data.cate_img,
            }
        });

        return res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: updatedCategory });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, code: ERROR_CODE, message: error, data: [] });
    }
}

const deleteCategory = async ( req, res ) => {
    try {
        const { data } = req.body;
        console.log(data)
        const category = await prisma.category.findUnique({
            where: {
                cate_slug: slugify(data.cateEN, { lower: true }), // when user delete right after update, the cate_slug is still the old one =>
                // need to use cateEN to find the cate
            }
        });

        if(!category) {
            return res.status(404).json({ success: false, code: ERROR_CODE, message: "Category not found", data: [] });
        }

        await prisma.categoryTranslation.deleteMany({
            where: {
                categoryId: category.id
            }
        });

        const deletedCategory = await prisma.category.delete({
            where: {
                id: category.id
            }
        });

        return res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: deletedCategory });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, code: ERROR_CODE, message: error, data: [] });
    }
}

export default APIHandler;