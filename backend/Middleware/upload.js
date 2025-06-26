// /Middleware/upload.js
const multer = require('multer');
const { storage } = require('../cloudinary'); // ✅ Import only storage

const upload = multer({ storage });

module.exports = upload;
