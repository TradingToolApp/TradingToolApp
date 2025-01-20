import db from "@/libs/prisma/db";

const handler = async (req, res) => {
    switch (req.method) {
        case "PUT":
            return activateKey(req, res);
    }
}

const activateKey = async (req, res) => {
    try {
        const {id} = req.body;
        const data = await db.subscription.update({
            where: {
                id
            },
            data: {
                active: true,
            }
        });

        return res.status(200).json({
            success: true,
            code: 200,
            message: "Key activated successfully!",
            data: JSON.parse(JSON.stringify(data))
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, code: 500, message: error, data: []});
    }
}

export default handler;