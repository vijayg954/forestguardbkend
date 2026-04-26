import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload-pdf", upload.single("pdf"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw", // VERY IMPORTANT for PDF
    });

    // delete local file
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      url: result.secure_url,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;