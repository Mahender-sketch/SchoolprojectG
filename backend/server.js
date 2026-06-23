import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path"; // CRITICAL: Added missing import
import fs from "fs";     // CRITICAL: Added missing import
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const app = express();
const PORT = process.env.PORT || 5000;

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Schema
const paperSchema = new mongoose.Schema({
  uploader: { type: String, required: true },
  year: { type: String, required: true },
  type: { type: String, required: true },
  course: { type: String, required: true },
  semester: { type: String, required: true },
  subject: { type: String, required: true },
  fileName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  likes: { type: Number, default: 0 },
  uploadDate: { type: String, required: true }
});

const Paper = mongoose.model("Paper", paperSchema);

// Multer Upload Config (Cloudinary)
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "SchoolProjectG",
    resource_type: "raw", 
    allowed_formats: ["pdf", "jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

// Health Check
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Get Papers
app.get("/api/papers", async (req, res) => {
  try {
    const { year, type, course, semester } = req.query;
    const filters = {};

    if (year) filters.year = year;
    if (type) filters.type = type;
    if (course) filters.course = course;
    if (semester) filters.semester = semester;

    const papers = await Paper.find(filters).sort({ _id: -1 });
    res.json(papers);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching papers",
      error: error.message
    });
  }
});

// Upload Paper
app.post("/api/papers", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { uploader, year, type, course, semester, subject } = req.body;
    
    // Cloudinary returns the full secure URL in req.file.path
    const fileUrl = req.file.path; 

    const newPaper = new Paper({
      uploader,
      year,
      type,
      course: course.trim().toUpperCase(),
      semester,
      subject,
      fileName: req.file.originalname,
      fileUrl,
      uploadDate: new Date().toLocaleDateString()
    });

    await newPaper.save();
    res.status(201).json({ message: "Paper uploaded successfully", data: newPaper });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

// Delete Paper (Updated for Cloudinary)
app.delete("/api/papers/:id", async (req, res) => {
  try {
    const adminPassword = req.headers["admin-password"];
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const paper = await Paper.findById(req.params.id);
    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    // 1. If it's a new Cloudinary URL, delete it from Cloudinary
    if (paper.fileUrl.includes("cloudinary.com")) {
      // Extract the public ID from Cloudinary URL (e.g., SchoolProjectG/filename.pdf)
      // Extracts everything after /upload/vXXXXXXXXX/ or just handles the path trailing elements
      const urlParts = paper.fileUrl.split('/');
      const uploadIndex = urlParts.indexOf('upload');
      // Public ID usually resides after the version tag (e.g., v12345678/)
      const publicIdWithExtension = urlParts.slice(uploadIndex + 2).join('/');
      const publicId = publicIdWithExtension.split('.')[0]; 

      // Delete from Cloudinary using their SDK
      await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
    } 
    // 2. Fallback: If it's an old local file URL layout, try to clean local storage gracefully
    else if (paper.fileUrl.includes("/uploads/")) {
      const filename = paper.fileUrl.split("/uploads/")[1];
      const filePath = path.join(__dirname, "uploads", filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Paper.findByIdAndDelete(req.params.id);
    res.json({ message: "Paper and file deleted successfully" });

  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
});

// Admin Login
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true });
  }
  res.status(401).json({ success: false, message: "Wrong password" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
