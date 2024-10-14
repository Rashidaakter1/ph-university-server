import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import fs from "fs";
import config from "../config";

// Configure Cloudinary with credentials
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

// Define the async function to upload images to Cloudinary
export const sendImageToCloudinary = async (
  path: string,
  imageName: string
) => {
  try {
    // Upload an image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(path, {
      public_id: imageName.trim(),
    });
    console.log("Upload Result:", uploadResult);

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url(imageName, {
      fetch_format: "auto",
      quality: "auto",
    });
    console.log("Optimized URL:", optimizeUrl);

    // Transform the image: auto-crop to square aspect ratio
    const autoCropUrl = cloudinary.url(imageName, {
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    });
    // console.log("Auto-cropped URL:", autoCropUrl);
    fs.unlink(path, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("File is deleted.");
      }
    });

    return {
      uploadResult,
      optimizeUrl,
      autoCropUrl,
    };
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error; // Re-throw error to handle it outside
  }
};

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads"); // Save uploaded files to this folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname); // Use original name for better clarity
  },
});

// Initialize Multer middleware with storage configuration
export const upload = multer({ storage: storage });
