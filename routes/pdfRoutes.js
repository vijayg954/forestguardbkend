import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

/**
 * ✅ Upload PDF
 */
router.post("/upload-pdf", upload.single("pdf"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw",
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

/**
 * ✅ Get PDF (Preview + Full)
 */
router.get("/get-pdf", (req, res) => {
  res.json({
    success: true,

    // 🔹 Preview (for now same PDF)
    previewUrl:
      "https://res.cloudinary.com/dozaonw8z/raw/upload/v1777190552/c9koo0setrmr80muxrhe",

    // 🔹 Full PDF (after purchase)
    fullPdfUrl:
      "https://res.cloudinary.com/dozaonw8z/raw/upload/v1777190552/c9koo0setrmr80muxrhe",
  });
});

/**
 * 🔒 (Optional future) Secure download route
 */
router.get("/download-pdf", (req, res) => {
  res.json({
    success: true,
    fullPdfUrl:
      "https://res.cloudinary.com/dozaonw8z/raw/upload/v1777190552/c9koo0setrmr80muxrhe",
  });
});

export default router;