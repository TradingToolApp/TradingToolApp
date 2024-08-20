import prisma from "@/lib/prisma";
import { SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE } from "@/lib/constant";

const APIHandler = async ( req, res ) => {
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

const getAuthors = async ( req, res ) => {
    try {
        const authors = await prisma.author.findMany({
            include: {
                translations: true,
            },
            orderBy: {
                id: 'asc'
            }
        });

        res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: authors });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: true, code: ERROR_CODE, message: error, data: [] });
    }
}

const createAuthor = async ( req, res ) => {
    try {
        const { data } = req.body;
        console.log(data)
        const newAuthor = await prisma.author.create({
            data: {
                name: data.name,
                translations: {
                    create: data.translations
                }
            }
        });

        res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: newAuthor });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: true, code: ERROR_CODE, message: error, data: [] });
    }
}

const updateAuthor = async ( req, res ) => {
    try {
        const { data } = req.body;
        const updatedAuthor = await prisma.author.update({
            where: {
                id: data.id
            },
            data: {
                name: data.name,
                translations: {
                    update: data.translations
                }
            }
        });

        res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: updatedAuthor });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: true, code: ERROR_CODE, message: error, data: [] });
    }
}

const deleteAuthor = async ( req, res ) => {
    try {
        const { id } = req.body;
        const deletedAuthor = await prisma.author.delete({
            where: {
                id: id
            }
        });

        res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: deletedAuthor });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: true, code: ERROR_CODE, message: error, data: [] });
    }
}

export default APIHandler;