import {ERROR_CODE, SUCCESS_CODE, SUCCESS_MESSAGE} from "@/libs/constant";
import db from "@/libs/prisma/db";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            return createRegisteredDevice(req, res);
        case "PUT":
            return updateRegisteredDevice(req, res);
        case "DELETE":
            return removeRegisteredDevice(req, res);
    }
}

const createRegisteredDevice = async (req, res) => {
    try {
        const {data} = req.body;

        const device = await db.subscriptionDevice.findUnique({
            where: {id: data.id}
        });

        if (device) {
            return res.status(400).json({
                success: false,
                code: ERROR_CODE,
                message: "Device already registered!",
                data: []
            });
        }

        const newDevice = await db.subscriptionDevice.create({
            data: {
                name: data.name,
                login: data.login,
                user: {
                    connect: {
                        id: data.userId
                    }
                }
            }
        });

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: "Create succeed!", data: newDevice});
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

const updateRegisteredDevice = async (req, res) => {
    try {
        const {data} = req.body;

        const device = await db.subscriptionDevice.findUnique({
            where: {id: data.id}
        });

        if (!device) {
            return res.status(400).json({success: false, code: ERROR_CODE, message: "Device not found!", data: []});
        }

        const updatedDevice = await db.subscriptionDevice.update({
            where: {id: data.id},
            data: {
                name: data.name,
                login: data.login
            }
        });

        return res.status(200).json({
            success: true,
            code: SUCCESS_CODE,
            message: "Update succeed!",
            data: updatedDevice
        });
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

const removeRegisteredDevice = async (req, res) => {
    try {
        const {data} = req.body;

        const device = await db.subscriptionDevice.findUnique({
            where: {id: data.id}
        });

        if (!device) {
            return res.status(400).json({success: false, code: ERROR_CODE, message: "Device not found!", data: []});
        }

        const deletedDevice = await db.subscriptionDevice.delete({
            where: {id: data.id}
        });

        return res.status(200).json({
            success: true,
            code: SUCCESS_CODE,
            message: "Remove succeed!",
            data: deletedDevice
        });
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}