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
        console.log(error.stack)
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

const createProduct = async (req, res) => {
    try {
        const {data} = req.body;

        const newProduct = await db.product.create({
            data: {
                id: data.id,
                name: data.name,
                image: data.image,
                price: data.price,
                type: data.type,
                platform: data.platform,
                status: data.status,
                allowedVersion: data.allowedVersion,
                latestVersion: data.latestVersion,
                forceUpdateCode: data.forceUpdateCode,
                urlPost: data.urlPost,
                urlDownload: data.urlDownload,
                translations: {
                    create: [{
                        description: data.description_EN,
                        language: {connect: {code: "en"}},
                    }, {
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
                    message: 'This product already exists! Please try another name or another id.',
                    data: []
                });
            }
        }
        console.log(error.stack);
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
                description: data.description_VI,
            }
        })

        const updatedProduct = await db.product.update({
            where: {
                id: product.id
            },
            data: {
                name: data.name,
                image: data.image,
                price: data.price,
                type: data.type,
                platform: data.platform,
                status: data.status,
                allowedVersion: data.allowedVersion,
                latestVersion: data.latestVersion,
                forceUpdateCode: data.forceUpdateCode,
                urlPost: data.urlPost,
                urlDownload: data.urlDownload,
            },
            include: {
                translations: true,
            },
        });

        return res.status(200).json({
            success: true,
            code: SUCCESS_CODE,
            message: SUCCESS_MESSAGE,
            data: updatedProduct
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
        console.log(error.stack);
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