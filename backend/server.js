import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config({ path: "./backend/.env" });
// const ADMIN_KEY = "my-secret-admin-123";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const app = express();
const PORT = process.env.PORT || 5000;

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
// app.use("/upload", express.static(path.join(__dirname, "upload")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

// Multer Upload Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});    

const upload = multer({ storage });

// Health Check
app.get("/", (req, res) => {
  res.send("Backend is running!");
});
const uploadPath = "backend/upload/";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

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
// Upload Paper
app.post("/api/papers", upload.single("file"), async (req, res) => {
  console.log("UPLOAD ROUTE HIT");
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    const {
      uploader,
      year,
      type,
      course,
      semester,
      subject
    } = req.body;

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

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

    res.status(201).json({
      message: "Paper uploaded successfully",
      data: newPaper
    });
  } catch (error) {
    res.status(500).json({
      message: "Upload failed",
      error: error.message
    });
  }
});
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

    const filename = paper.fileUrl.split("/uploads/")[1];

    const filePath = path.join(__dirname, "uploads", filename);
console.log("FILE URL:", paper.fileUrl);
console.log("FILENAME:", filename);
console.log("FILE PATH:", filePath);
console.log("EXISTS:", fs.existsSync(filePath));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Paper.findByIdAndDelete(req.params.id);

    res.json({ message: "Paper and file deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
});
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    return res.json({
      success: true
    });
  }

  res.status(401).json({
    success: false,
    message: "Wrong password"
  });
});
// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("ADMIN PASSWORD:", process.env.ADMIN_PASSWORD);
});