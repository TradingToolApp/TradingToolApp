import multer from "multer";
import path from "path";
import { SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE } from "@/lib/constant";
import { imageGetDir } from "@/lib/constant";
import prisma from "@/lib/prisma";
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

const fs = require('fs');

export const config = {
    api: {
        bodyParser: false,
    },
};
const imagesDirectory = path.join(process.cwd(), './public/uploadImages')

const storage = multer.diskStorage({
    destination: ( req, file, cb ) => {
        const uploadPath = imagesDirectory;

        // Create the folder if it doesn't exist
        require("fs").mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);
    },
    filename: ( req, file, cb ) => {
        cb(
            null,
            `${Date.now()}-${file.originalname}`
        );
    },
});

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

const postHandler = async ( req, res ) => {
    switch (req.method) {
        case "GET":
            return getImages(req, res);
        case "POST":
            return createImages(req, res);
        case "DELETE":
            return deleteImages(req, res);
    }
};

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});


const getImages = async ( req, res ) => {
    try {
        // Get all images from local server
        // const files = fs.readdirSync(imageUploadDir);
        // const images = files.map((file) => {
        //     return {
        //         filepath: `/uploadImages/${file}`
        //     }
        // });

        // Get all images from the database
        const images = await prisma.image.findMany();

        return res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: images });
    } catch (error) {
        return res.status(500).json({ success: false, code: ERROR_CODE, message: error, data: [] });
    }
}

const createImages = async ( req, res ) => {
    try {
        // Upload to server
        await new Promise(( resolve, reject ) => {
            upload.array("file", 5)(req, res, ( err ) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });

        // Access the 'file' property after the multer middleware processes the file
        const files = req.files;

        if (!files) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const images = files.map(( file ) => {
            return {
                originalname: file.originalname,
                filename: file.filename,
                filepath: imageGetDir + '/' + file.filename,
                destination: file.destination,
                mimetype: file.mimetype,
                size: file.size,
                url: "", //for now there is nowhere to store the url
            }
        })

        // // Upload to S3
        // const key = "images/" + files.originalname;
        // const command = new PutObjectCommand({
        //     Bucket: process.env.AWS_S3_BUCKET_NAME,
        //     Key: key,
        //     Body: files.buffer,
        //     ContentType: files.mimetype,
        //     ACL: 'public-read',
        // });
        // const response = await s3.send(command);

        // // Save the image data to the database
        await prisma.image.createMany({
            data: images,
        });

        return res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: images });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, code: ERROR_CODE, message: error, data: [] });
    }
};

const deleteImages = async ( req, res ) => {
    const rawBody = await buffer(req);
    const filepaths = JSON.parse(rawBody.toString());
    try {
        // Delete the image from the database
        const file = await prisma.image.deleteMany({
            where: {
                filepath: {
                    in: filepaths
                }
            },
        });

        // Delete the image from the local server
        filepaths.map(async ( filepath ) => {
            fs.unlinkSync("./public" + filepath)
        });

        return res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: file });
    } catch (error) {
        return res.status(500).json({ success: false, code: ERROR_CODE, message: error, data: [] });
    }
}


export default postHandler;