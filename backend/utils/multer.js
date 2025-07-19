import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

// Setup storage engine
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'properties', // folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

console.log("multer is working")

const parser = multer({ storage });

export default parser;
