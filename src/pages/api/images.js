import multer from "multer";
import path from "path";
import { SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE } from "@/lib/constant";
import { imageUploadDir, imageGetDir } from "@/lib/constant";
import prisma from "@/lib/prisma";
import uploadToGgDrive from "./utils/uploadDrive";

const fs = require('fs');

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = imageUploadDir;

    // Create the folder if it doesn't exist
    require("fs").mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${file.originalname}`
    );
  },
});

const upload = multer({ storage });

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
    // // Get all images from local server
    // const files = fs.readdirSync(imageUploadDir);
    // const images = files.map((file) => `/uploadImages/${file}`);

    // Get all images from the database
    const files = await prisma.image.findMany();
    const images = files.map((file) => {
      return { ...file, filepath: `${imageGetDir}/${file.filename}` }
    }
    );

    res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: images });
  } catch (error) {
    res.status(500).json({ success: false, code: ERROR_CODE, message: error, data: [] });
  }
}

const createImages = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      upload.single("file")(req, res, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });

    // Access the 'file' property after the multer middleware processes the file
    const uploadedFile = req.file;

    if (!uploadedFile) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload the image to Google Drive
    // For now, Google Drive is used as a backup storage, because imageURL can not be used to render now.
    const result = await uploadToGgDrive({
      fileName: uploadedFile.filename,
      folderName: 'TradingToolApp/images',
      fileData: Buffer.from(JSON.stringify(uploadedFile)),
      fileMimeType: uploadedFile.mimetype,
    });
    const imageURL = `https://drive.google.com/uc?export=view&id=${result.id}`

    // Save the image to the database
    const newImage = await prisma.image.create({
      data: {
        originalname: uploadedFile.originalname,
        filename: uploadedFile.filename,
        filepath: imageGetDir + '/' + uploadedFile.filename,
        destination: uploadedFile.destination,
        mimetype: uploadedFile.mimetype,
        size: uploadedFile.size,
        url: imageURL,
      }
    });

    res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: newImage });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, code: ERROR_CODE, message: error, data: [] });
  }
};

const deleteImages = async (req, res) => {
  const { fileName } = req.body;

  try {
    // Delete the image from the local server
    const filePath = path.join(imageUploadDir, fileName);
    fs.unlinkSync(filePath)

    // Delete the image from the database
    const image = await prisma.user.delete({
      where: {
        filename: fileName,
      },
    });

  } catch (error) {
    res.status(500).json({ success: true, code: ERROR_CODE, message: error, data: [] });
  }
}



export default postHandler;