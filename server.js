const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.post("/upload", upload.single("photo"), (req, res) => {
    res.json({
        success: true,
        imageUrl: "/uploads/" + req.file.filename
    });
});

app.get("/photos", (req, res) => {
    fs.readdir("uploads", (err, files) => {
        if (err) return res.json([]);
        res.json(files.map(f => '/uploads/${f}'));
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});