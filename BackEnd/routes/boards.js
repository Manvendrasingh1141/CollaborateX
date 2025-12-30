const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");


const storage = multer.memoryStorage();
const upload = multer({ storage });

const savedBoardsPath = path.join(__dirname, "../savedBoards");
if (!fs.existsSync(savedBoardsPath)) {
  fs.mkdirSync(savedBoardsPath);
}


router.post("/saveBoard", upload.single("boardImage"), (req, res) => {
  const { username, roomId } = req.body;

  if (!username || !roomId || !req.file) {
    return res.status(400).json({ error: "Missing data" });
  }

  const timestamp = Date.now();
  const safeUsername = username.replace(/\s+/g, "_"); 
  const safeRoomId = roomId.replace(/\s+/g, "_");
  const fileName = `${safeUsername}_${safeRoomId}_${timestamp}.png`;

  const savePath = path.join(savedBoardsPath, fileName);


  fs.writeFileSync(savePath, req.file.buffer);

  res.json({ success: true, message: "Board saved!" });
});

module.exports = router;
