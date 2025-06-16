require('dotenv').config(); 
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Validate environment variables
const validateConfig = () => {
  const requiredEnvVars = ['CLOUD_NAME', 'CLOUD_API_KEY', 'CLOUD_API_SECRET'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(`Missing Cloudinary config: ${missingVars.join(', ')}`);
  }
};

try {
  validateConfig();
  
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true // Always use HTTPS
  });

  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "bgmi_teams_logos",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      format: "webp", // Convert to webp for better compression
      quality: "auto:good", // Automatic quality adjustment
      transformation: [
        { width: 500, height: 500, crop: "limit" }, // Resize with limits
        { fetch_format: "auto" }
      ],
      resource_type: "image",
      max_file_size: 2 * 1024 * 1024 // 2MB limit
    },
    filename: function (req, file, cb) {
      // Generate unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  });

  // Test Cloudinary connection
  cloudinary.api.ping()
    .then(result => {
      if (result.status !== 'ok') {
        console.error('Cloudinary connection test failed:', result);
      }
    })
    .catch(err => {
      console.error('Cloudinary connection error:', err.message);
    });

  module.exports = { 
    cloudinary, 
    storage,
    deleteFromCloudinary: async (publicId) => {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error('Error deleting Cloudinary asset:', err);
        throw err;
      }
    }
  };

} catch (err) {
  console.error('Cloudinary configuration failed:', err.message);
  process.exit(1); // Exit if configuration fails
}