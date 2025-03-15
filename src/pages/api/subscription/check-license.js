import db from "@/libs/prisma/db";

export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
            return res.status(400).json({success: false, message: 'Invalid method'});
        }
        if (!req.body.userId || !req.body.productId) return res.status(400).json({
            success: false,
            message: 'Please Provide User ID and Product ID'
        })
        const {userId, productId} = req.body;

        const subscription = await db.subscription.findMany({
            where: {
                userId: userId,
                productId: productId,
                endDate: {
                    gte: new Date(),
                }
            },
            include: {
                product: true,
                package: true
            }
        });

        if (subscription.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Subscription not found! Please take trial or buy to use this product'
            });
        }

        return res.status(200).json({success: true, message: 'Check license successfully', data: subscription});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
}