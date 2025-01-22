import {ERROR_CODE, SUCCESS_CODE, SUCCESS_MESSAGE} from "@/libs/constant";
import db from "@/libs/prisma/db";

const handler = async (req, res) => {
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

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: deletedDevice});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

export default handler;