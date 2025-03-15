import {ERROR_CODE, SUCCESS_CODE, SUCCESS_MESSAGE} from "@/libs/constant";
import {decryptData} from "@/libs/cryptojs";

/**
 * @swagger
 * /api/subscription/decrypt:
 *   post:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: Hello World!
 */

const handler = async (req, res) => {
    switch (req.method) {
        case "POST":
            return decrypt(req, res);
    }
}

const decrypt = async (req, res) => {
    try {
        const {licenseKey, secret} = req.body;

        if (!licenseKey || !secret) {
            return res.status(400).json({error: "Missing licenseKey or secret"})
        }

        const decryptObj = decryptData(licenseKey.toString(), secret)

        return res.status(200).json({
            success: true,
            code: SUCCESS_CODE,
            message: SUCCESS_MESSAGE,
            data: decryptObj
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

export default handler;