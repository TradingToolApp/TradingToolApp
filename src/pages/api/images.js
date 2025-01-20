import multer from "multer";
import {buffer} from "micro";
import {S3Client, PutObjectCommand, DeleteObjectsCommand} from '@aws-sdk/client-s3';
import {SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE} from "@/libs/constant";
import db from "@/libs/prisma/db";

const fs = require('fs');

export const config = {
    api: {
        bodyParser: false,
    },
};

const storage = multer.memoryStorage()
const upload = multer({
    storage,
    limits: {
        fileSize: 8000000 // 8MB
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

        if (!allowedTypes.includes(file.mimetype)) {
            const error = new Error('Invalid file type. Allowed: jpeg, jpg, png');
            error.code = 'INVALID_FILE_TYPE';
            return cb(error, false);
        }

        cb(null, true);
    }
});

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const postHandler = async (req, res) => {
    switch (req.method) {
        case "GET":
            return getImages(req, res);
        case "POST":
            return createImages(req, res);
        case "DELETE":
            return deleteImages(req, res);
    }
};

const getImages = async (req, res) => {
    try {

        // Get all images from the database
        const images = await db.image.findMany();

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: images});
    } catch (error) {
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}

const createImages = async (req, res) => {
    try {
        // Upload to server
        await new Promise((resolve, reject) => {
            upload.array("file", 5)(req, res, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });


        // Access the 'file' property after the multer middleware processes the file
        const files = req.files;

        if (!files) {
            return res.status(400).json({error: "No file uploaded"});
        }

        // Upload to S3
        for (let i = 0; i < files.length; i++) {
            const keyS3 = "admin/images/" + files[i].originalname;
            const command = new PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: keyS3,
                Body: files[i].buffer,
                ContentType: files[i].mimetype,
                ACL: 'public-read',
            });
            await s3.send(command);
        }

        const images = files.map((file) => {
            const keyS3 = "admin/images/" + file.originalname;
            return {
                originalname: file.originalname,
                mimetype: file.mimetype,
                encoding: file.encoding,
                size: file.size,
                Key: keyS3,
                url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/` + keyS3,
            }
        })

        // Save the image data to the database
        await db.image.createMany({
            data: images,
        });

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: images});
    } catch (error) {
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
};

const deleteImages = async (req, res) => {
    const rawBody = await buffer(req);
    const urls = JSON.parse(rawBody.toString());
    try {
        const keys = await db.image.findMany({
            where: {
                url: {
                    in: urls
                }
            },
            select: {
                Key: true
            }
        })

        const posts = await db.post.findMany({
            where: {
                featureImg: {
                    in: urls
                }
            }
        });

        if (posts.length > 0) {
            return res.status(400).json({
                success: false,
                code: ERROR_CODE,
                message: "Image is being used in some posts. Delete these posts first!",
                data: []
            });
        }

        const categories = await db.category.findMany({
            where: {
                cate_img: {
                    in: urls
                }
            }
        });

        if (categories.length > 0) {
            return res.status(400).json({
                success: false,
                code: ERROR_CODE,
                message: "Image is being used in some categories. Delete these categories first!",
                data: []
            });
        }

        const authors = await db.author.findMany({
            where: {
                author_img: {
                    in: urls
                }
            }
        });

        if (authors.length > 0) {
            return res.status(400).json({
                success: false,
                code: ERROR_CODE,
                message: "Image is being used in some authors. Delete these authors first!",
                data: []
            });
        }

        // Delete the image from S3
        const command = new DeleteObjectsCommand({
            "Bucket": process.env.AWS_S3_BUCKET_NAME,
            "Delete": {
                "Objects": keys,
                "Quiet": false
            }
        });
        const response = await s3.send(command);

        // Delete the image from the database
        const file = await db.image.deleteMany({
            where: {
                url: {
                    in: urls
                }
            },
        });

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: file});
    } catch (error) {
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
}


export default postHandler;