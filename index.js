var express = require("express");
var cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const path = require("path");
var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Set up file upload with multer
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

// API route for file upload
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Extract file details
  const fileDetails = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  };

  // Respond with file details in JSON
  res.json(fileDetails);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
