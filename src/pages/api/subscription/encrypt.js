import {ERROR_CODE, SUCCESS_CODE, SUCCESS_MESSAGE} from "@/libs/constant";
import {encryptData, generateSecretKey} from "../libs-server/cryptojs";

const handler = async (req, res) => {
    switch (req.method) {
        case "POST":
            return encrypt(req, res);
    }
}

const encrypt = async (req, res) => {
    try {
        const secretkey = generateSecretKey();
        console.log(secretkey)

        const {object, secret} = req.body;
        const encryptObj = encryptData(object, secret)

        return res.status(200).json({
            success: true,
            code: SUCCESS_CODE,
            message: SUCCESS_MESSAGE,
            data: encryptObj
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

export default handler;