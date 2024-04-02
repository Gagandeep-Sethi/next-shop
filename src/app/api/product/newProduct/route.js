import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";

import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connect();
export async function POST(req) {
  try {
    //retracting data from req
    const data = await req.formData();
    const files = data.getAll("images");
    const {
      name,
      category,
      description,
      originalPrice,
      discountedPrice,
      size,
    } = Object.fromEntries(data.entries());

    if (!files || files.length === 0) {
      return NextResponse.json(
        { message: "No images found in the request" },
        { status: 400 }
      );
    }
    //converting image files into buffer
    const fileBuffers = [];

    for (const file of files) {
      console.log("Processing file:", file.name);

      const reader = file.stream().getReader();
      let chunks = [];
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        if (value) {
          chunks.push(value);
        }
      }

      const arrayBuffer = new Blob(chunks).arrayBuffer();
      const buffer = Buffer.from(await arrayBuffer);
      fileBuffers.push(buffer);
    }

    const imageIds = await uploadImagesToCloudinary(
      fileBuffers,
      "nextShop/product"
    );

    // Here, you can store the image IDs in your MongoDB database
    const newProduct = await Product.create({
      name,
      category,
      description,
      images: imageIds,
      originalPrice,
      displayPrice: discountedPrice,
      size,
    });

    // Return success response
    return NextResponse.json(
      { message: "Product added", product: newProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Error processing request" },
      { status: 500 }
    );
  }
}
//uploading images to cloudinary
async function uploadImagesToCloudinary(fileBuffers, folder) {
  const uploadPromises = fileBuffers.map((buffer, index) => {
    return new Promise((resolve, reject) => {
      //const fileName = `image_${index + 1}`; // Generate a unique filename
      cloudinary.uploader
        .upload_stream(
          { folder: folder, resource_type: "image" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });
  });

  const results = await Promise.all(uploadPromises);
  return results.map((result) => result.public_id);
}
