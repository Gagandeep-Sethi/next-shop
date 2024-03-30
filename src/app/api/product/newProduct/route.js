// import multer from "multer";
// import { v2 as cloudinary } from "cloudinary";
// import { NextResponse } from "next/server";
// import { connect } from "@/dbConfig/dbConfig";
// import Product from "@/models/productModel";

// connect();

// // Configure multer to parse multipart/form-data
// const upload = multer({ dest: "uploads/" });

// // Configure Cloudinary with your credentials
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const config = {
//   api: {
//     bodyParser: false, // Disable default body parsing
//   },
// };

// export  async POST (req, res) => {
//   try {
//     // Parse the FormData
//     upload.array("images")(req, res, async (err) => {
//       if (err) {
//         console.error("Error uploading images:", err);
//         return NextResponse.json(
//           { message: "Error uploading images" },
//           { status: 500 }
//         );
//       }

//       const body = req.body;

//       const {
//         name,
//         category,
//         description,
//         originalPrice,
//         discountedPrice,
//         size,
//       } = body;

//       // Upload the files to Cloudinary
//       const uploadedImages = await Promise.all(
//         req.files.map((file) =>
//           uploadImageToCloudinary(file.path, "nextShop/product")
//         )
//       );

//       // Create a new product with the uploaded image IDs
//       const newProduct = await Product.create({
//         name,
//         category,
//         description,
//         images: uploadedImages.map((image) => image.public_id),
//         originalPrice,
//         displayPrice: discountedPrice,
//         size,
//       });

//       return NextResponse.json(
//         { message: "Product added", product: newProduct },
//         { status: 200 }
//       );
//     });
//   } catch (error) {
//     console.error("Error parsing request body:", error);
//     return NextResponse.json(
//       { message: "Error parsing request body" },
//       { status: 500 }
//     );
//   }
// };

// async function uploadImageToCloudinary(filePath, folder) {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       filePath,
//       { folder: folder, resource_type: "image" },
//       (error, result) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result);
//         }
//       }
//     );
//   });
// }
// Import necessary modules
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";

// Connect to the database
connect();

// Configure multer to parse multipart/form-data
const upload = multer({ dest: "uploads/" });

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Export the POST method as a named export
export const config = {
  api: {
    bodyParser: false, // Disable default body parsing
  },
};

export async function POST(req, res) {
  try {
    // Parse the FormData
    upload.array("images")(req, res, async (err) => {
      if (err) {
        console.error("Error uploading images:", err);
        return res.status(500).json({ message: "Error uploading images" });
      }

      // Extract form data
      const {
        name,
        category,
        description,
        originalPrice,
        discountedPrice,
        size,
      } = req.body;

      // Upload images to Cloudinary
      const uploadedImages = await Promise.all(
        req.files.map((file) =>
          uploadImageToCloudinary(file.path, "nextShop/product")
        )
      );

      // Create a new product
      const newProduct = await Product.create({
        name,
        category,
        description,
        images: uploadedImages.map((image) => image.public_id),
        originalPrice,
        displayPrice: discountedPrice,
        size,
      });

      // Return success response
      return NextResponse.json(
        { message: "Product added", product: newProduct },
        { status: 200 }
      );
    });
  } catch (error) {
    console.error("Error parsing request body:", error);
    // Return error response
    return NextResponse.json(
      { message: "Error parsing request body" },
      { status: 500 }
    );
  }
}

// Helper function to upload image to Cloudinary
async function uploadImageToCloudinary(filePath, folder) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      { folder: folder, resource_type: "image" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
}

// import multer from "multer";
// import { v2 as cloudinary } from "cloudinary";
// import { NextResponse } from "next/server";
// import { connect } from "@/dbConfig/dbConfig";
// import Product from "@/models/productModel";

// connect();

// // Configure multer to parse multipart/form-data
// const upload = multer({ dest: "uploads/" });

// // Configure Cloudinary with your credentials
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function POST(req) {
//   try {
//     const body = await req.json();

//     const {
//       name,
//       category,
//       description,
//       originalPrice,
//       discountedPrice,
//       size,
//     } = body;

//     upload.array("images")(req, null, async (err) => {
//       try {
//         if (err) {
//           console.error("Error uploading images:", err);
//           return NextResponse.json(
//             { message: "Error uploading images" },
//             { status: 500 }
//           );
//         }

//         const files = req.files || [];
//         const imageIds = await Promise.all(
//           files.map((file) =>
//             uploadImageToCloudinary(file.path, "nextShop/product")
//           )
//         );

//         const newProduct = await Product.create({
//           name,
//           category,
//           description,
//           images: imageIds,
//           originalPrice,
//           displayPrice: discountedPrice,
//           size,
//         });

//         return NextResponse.json(
//           { message: "Product added", product: newProduct },
//           { status: 200 }
//         );
//       } catch (uploadError) {
//         console.error("Error uploading images:", uploadError);
//         return NextResponse.json(
//           { message: "Error uploading images" },
//           { status: 500 }
//         );
//       }
//     });

//     // Return a placeholder response while images are being uploaded
//     return NextResponse.json({ message: "Uploading images..." });
//   } catch (error) {
//     console.error("Error parsing request body:", error);
//     return NextResponse.json(
//       { message: "Error parsing request body" },
//       { status: 500 }
//     );
//   }
// }

// async function uploadImageToCloudinary(filePath, folder) {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       filePath,
//       { folder: folder, resource_type: "image" }, //in which folder to store file in cloudinary
//       (error, result) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result.public_id);
//         }
//       }
//     );
//   });
// }

// import { NextResponse } from "next/server";
// import { connect } from "@/dbConfig/dbConfig";
// import Product from "@/models/productModel";

// connect();

// export async function POST(req) {
//   const body = await req.json();
//   const {
//     name,
//     category,
//     description,
//     images,
//     originalPrice,
//     discountedPrice,
//     size,
//   } = body;
//   try {
//     const newProduct = await Product.create({
//       name,
//       category,
//       description,
//       images,
//       originalPrice,
//       displayPrice: discountedPrice,
//       size,
//     });
//     return NextResponse.json({ mesage: "Product added" }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ mesage: error.mesage }, { status: 500 });
//   }
// }
