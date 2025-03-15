import {ERROR_CODE, SUCCESS_CODE, SUCCESS_MESSAGE} from "@/libs/constant";
import {encryptData} from "@/libs/cryptojs";

const handler = async (req, res) => {
    switch (req.method) {
        case "POST":
            return encrypt(req, res);
    }
}

const encrypt = async (req, res) => {
    try {
        const {data, secret} = req.body;

        if (!data || !secret) {
            return res.status(400).json({error: "Missing data or secret"})
        }

        const encryptObj = encryptData(data, secret)

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