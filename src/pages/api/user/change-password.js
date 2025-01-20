import {ERROR_CODE, SUCCESS_CODE, SUCCESS_MESSAGE} from "@/libs/constant";
import db from "@/libs/prisma/db";
import {hashedPassword, comparePassword} from "../libs-server/bcrypt";

const handler = async (req, res) => {
    try {
        const {data} = req.body;

        const user = await db.user.findUnique({
            where: {email: data.email}
        });

        if (!user) {
            return res.status(400).json({success: false, code: ERROR_CODE, message: "User not found!", data: []});
        }

        const isMatch = await comparePassword(data.oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                code: ERROR_CODE,
                message: "Old password is incorrect!",
                data: []
            });
        }

        const hashed = await hashedPassword(data.newPassword);

        const updatedUser = await db.user.update({
            where: {email: data.email},
            data: {
                password: hashed
            }
        });

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: updatedUser});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

export default handler;