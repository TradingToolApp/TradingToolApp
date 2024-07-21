import multer from "multer";
import path from "path";
import { sql } from "@vercel/postgres";
import { SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE } from "@/lib/constant";
import { imageUploadDir } from "@/lib/constant";

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
      `${Date.now()}-${file.fieldname}${file.originalname.substring(
        file.originalname.lastIndexOf(".")
      )}`
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
    const files = fs.readdirSync(imageUploadDir);
    const images = files.map((file) => `/uploadImages/${file}`);

    res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: images });
  } catch (error) {
    res.status(500).json({ success: true, code: ERROR_CODE, message: error, data: [] });
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

    // Assuming the uploaded file is saved in the public/uploads folder
    const fileName = uploadedFile.filename;
    const filePath = path.join(imageUploadDir, fileName);

    res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: { fileName, filePath }});
  } catch (error) {
    res.status(500).json({ success: true, code: ERROR_CODE, message: error, data: [] });
  }
};

const deleteImages = async (req, res) => {
  const { fileName } = req.body;

  try {
    const filePath = path.join(imageUploadDir, fileName);
    fs.unlinkSync(filePath)
  } catch (error) {
    res.status(500).json({ success: true, code: ERROR_CODE, message: error, data: [] });
  }
}

export default postHandler;