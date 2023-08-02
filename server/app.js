const express = require("express");
const multer = require("multer");

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + "_" + Date.now());
  },
});

const upload = multer({ storage });

app.post("/upload-single", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log(req.file);

  res.status(200).json({ msg: "File uploaded successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
