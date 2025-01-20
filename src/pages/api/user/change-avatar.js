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
        case "POST":
            return updateAvatar(req, res);
    }
};


const updateAvatar = async (req, res) => {
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
        // for (let i = 0; i < files.length; i++) {
        //     const key = "images/" + files[i].originalname;
        //     const command = new PutObjectCommand({
        //         Bucket: "tradingtoolapp/user/avatar",
        //         Key: key,
        //         Body: files[i].buffer,
        //         ContentType: files[i].mimetype,
        //         ACL: 'public-read',
        //     });
        //     await s3.send(command);
        // }

        const images = files.map((file) => {
            return {
                originalname: file.originalname,
                mimetype: file.mimetype,
                encoding: file.encoding,
                size: file.size,
                Key: "images/user/avatar" + file.originalname,
                url: "https://tradingtoolapp.s3.ap-southeast-1.amazonaws.com/images/user/avatar" + file.originalname,
            }
        })

        // Save the image data to the database
        // await db.image.createMany({
        //     data: images,
        // });

        return res.status(200).json({success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: images});
    } catch (error) {
        return res.status(500).json({success: false, code: ERROR_CODE, message: error, data: []});
    }
};


export default postHandler;