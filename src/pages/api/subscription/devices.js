import db from "@/libs/prisma/db";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return getDevices(req, res);
    }
}

const getDevices = async (req, res) => {
    try {
        const {userId} = req.body;

        const devices = await db.subscriptionDevice.findMany({
            where: {
                userId: userId,
            },
            select: {
                id: true,
                name: true,
                login: true,
            },
        });

        return res.status(200).json({success: true, data: devices});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
};