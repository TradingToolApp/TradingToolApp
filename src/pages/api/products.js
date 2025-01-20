import db from "@/libs/prisma/db";
import {SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE} from "@/libs/constant";
import {Prisma} from '@prisma/client'

const APIHandler = async (req, res) => {
    switch (req.method) {
        case "GET":
            return getProducts(req, res);
        case "POST":
            return createProduct(req, res);
        case "PUT":
            return updateProduct(req, res);
        case "DELETE":
            return deleteProduct(req, res);
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await db.product.findMany({
            include: {
                translations: true,
            },
            orderBy: {
                id: 'asc'
            }
        });

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: products});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

const createProduct = async (req, res) => {
    try {
        const {data} = req.body;

        const newProduct = await db.product.create({
            data: {
                image: data.image,
                url: data.url,
                translations: {
                    create: [{
                        name: data.name_EN,
                        description: data.description_EN,
                        language: {connect: {code: "en"}},
                    }, {
                        name: data.name_VI,
                        description: data.description_VI,
                        language: {connect: {code: "vi"}},
                    }],
                }
            },
            include: {
                translations: true,
            },
        });

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: newProduct});
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return res.status(400).json({
                    success: false,
                    code: ERROR_CODE,
                    message: 'This product already exists! Please try another name.',
                    data: []
                });
            }
        }
        console.log(error.code);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

const updateProduct = async (req, res) => {
    try {
        const {data} = req.body;

        const product = await db.product.findUnique({
            where: {
                id: data.id,
            }
        });

        if (!product) {
            return res.status(404).json({success: false, code: ERROR_CODE, message: "Product not found", data: []});
        }

        await db.productTranslation.update({
            where: {
                productId_languageCode: {
                    productId: product.id,
                    languageCode: "en"
                }
            },
            data: {
                name: data.name_EN,
                description: data.description_EN,
            }
        })

        await db.productTranslation.update({
            where: {
                productId_languageCode: {
                    productId: product.id,
                    languageCode: "vi"
                }
            },
            data: {
                name: data.name_VI,
                description: data.description_VI,
            }
        })

        const updatedProduct = await db.product.update({
            where: {
                id: product.id
            },
            data: {
                image: data.image,
                url: data.url,
            },
            include: {
                translations: true,
            },
        });

        return res.status(200).json({
            success: true,
            code: SUCCESS_CODE,
            message: SUCCESS_MESSAGE,
            data: "updatedProduct"
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return res.status(400).json({
                    success: false,
                    code: ERROR_CODE,
                    message: 'This product already exists! Please try another name.',
                    data: []
                });
            }
        }
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

const deleteProduct = async (req, res) => {
    try {
        const {data} = req.body;

        const product = await db.product.findUnique({
            where: {
                id: data.id,
            }
        });

        if (!product) {
            return res.status(404).json({success: false, code: ERROR_CODE, message: "Product not found", data: []});
        }

        await db.productTranslation.deleteMany({
            where: {
                productId: product.id
            }
        });

        const deletedProduct = await db.product.delete({
            where: {
                id: product.id
            }
        });

        return res.status(200).json({
            success: true,
            code: SUCCESS_CODE,
            message: SUCCESS_MESSAGE,
            data: deletedProduct
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return res.status(400).json({
                    success: false,
                    code: ERROR_CODE,
                    message: 'This product already exists! Please try another name.',
                    data: []
                });
            }
        }
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

export default APIHandler;