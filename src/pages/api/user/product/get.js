import {ERROR_CODE, SUCCESS_CODE, SUCCESS_MESSAGE} from "@/libs/constant";
import {encryptData} from "../../libs-server/cryptojs";
import userData from "./data"

export default function handler(req, res) {
    switch (req.method) {
        case "GET":
            return getUserProduct(req, res);
    }
}

const getUserProduct = async (req, res) => {
    const {name, id} = req.query
    try {
        if (!id) {
            return res.status(400).json({error: "Missing user id"})
        }

        const jsondata = JSON.stringify(userData);
        // const jsondata = "{\"name\":\"John Doe\",\"login\":\"johndoe123\",\"products\":[{\"name\":\"RSI\",\"id\":12345,\"expiry\":\"2025-02-03 23:00:00\",\"version\":2,\"update version required\":1,\"update required\":0},{\"name\":\"MACD\",\"id\":54321,\"expiry\":\"2025-07-10 18:45:30\",\"version\":1.7,\"update version required\":0,\"update required\":1}]}";

        // console.log(jsondata)
        // return res.status(200).json(jsondata);

        const encryptJson = encryptData(jsondata, process.env.LICENSE_KEY_SECRET);
        const data = "###!!!" + encryptJson + "!!!###"
        return res.status(200).json(data);
    } catch (error) {
        console.log(error.code);
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}
