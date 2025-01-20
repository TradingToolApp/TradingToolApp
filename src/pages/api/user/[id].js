import db from "@/libs/prisma/db";
import {ERROR_CODE, SUCCESS_CODE, SUCCESS_MESSAGE} from "@/libs/constant";
import {Prisma} from "@prisma/client";

export default function handler(req, res) {
    switch (req.method) {
        case "GET":
            return getUserById(req, res);
        case "PUT":
            return updateUserById(req, res);
        // case "DELETE":
        //     return deleteUserById(req, res);
    }
}

const getUserById = async (req, res) => {
    const {id} = req.query
    try {
        if (!id) {
            return res.status(400).json({error: "Missing user id"})
        }
        const user = await db.user.findFirst({
            where: {
                id: id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
                phone: true,
                subscriptions: {
                    where: {
                        active: true
                    },
                    include: {
                        devices: true,
                    }
                }
            },
        })

        if (!user) {
            return res.status(404).json({error: "User not found"})
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error.code);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

const updateUserById = async (req, res) => {
    try {
        const {data} = req.body

        const user = await db.user.update({
            where: {
                id: data.id
            },
            data: {
                name: data.name,
                email: data.email
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
                phone: true,
                subscriptions: {
                    where: {
                        active: true
                    }
                }
            }
        })
        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: user});
    } catch {
        return res.status(200).json({success: false, code: ERROR_CODE, message: "Internal Server Error", data: []});
    }
}

const deleteUserById = async (req, res) => {
    try {
        const {id} = req.query
        const user = await db.user.delete({
            where: {
                id: id
            }
        })
        res.status(200).json(user)
    } catch {
        return res.status(500).json({error: "Internal Server Error"})
    }
}