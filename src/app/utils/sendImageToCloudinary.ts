import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

// Configure Cloudinary with credentials
cloudinary.config({
  cloud_name: "djutfjpnk",
  api_key: "996789188713482",
  api_secret: "9s1deEB1QDmrE8hBJ4dZa-3IaqE",
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
