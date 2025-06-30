const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload folder exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error('Only JPEG, PNG, WebP allowed'));
};

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter
});

module.exports = upload;
