import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudanary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "serviceSync/idProofs",
    resource_type: "auto"
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB 
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf"
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
      new Error("Only JPG, PNG, PDF files are allowed"),
      false
    );
    }
  }
});

export default upload;