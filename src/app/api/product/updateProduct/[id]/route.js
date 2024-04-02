import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import { v2 as cloudinary } from "cloudinary";

connect();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(req, { params }) {
  console.log("re recieved");
  try {
    const products = await Product.findById(params.id); //new true will return the updated value rather then older value
    if (!products) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 400 }
      );
    }

    const data = await req.formData();
    let files = data.getAll("images");
    const newImageFiles = data.getAll("newImageUploads");
    const dletedImageFiles = data.getAll("deletedImages");

    const {
      name,
      category,
      description,
      originalPrice,
      discountedPrice,
      size,
    } = Object.fromEntries(data.entries());

    //Delete images from cloudinary removed by user
    if (dletedImageFiles && dletedImageFiles.length !== 0) {
      console.log("deleted image found");
      try {
        await deleteImages(dletedImageFiles);
        console.log("images deleted");
      } catch (error) {
        return NextResponse.json(
          { message: "Unable to delete images from cloudinary" },
          { status: 400 }
        );
      }
    }

    //Upload newly added images by user to cloudinary
    const fileBuffers = [];
    if (newImageFiles.length > 0) {
      console.log("new image files recieved");
      for (const file of newImageFiles) {
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
    }

    console.log("File processing complete");
    let newAddedImageIds = [];
    if (fileBuffers.length > 0) {
      const imageIds = await uploadImagesToCloudinary(
        fileBuffers,
        "nextShop/product"
      );
      newAddedImageIds = [...newAddedImageIds, ...imageIds];

      console.log("Image IDs:", imageIds);
    }

    //Combining previous images and newly added images

    files = [...files, ...newAddedImageIds];

    const updatedProduct = await Product.findByIdAndUpdate(
      params.id,
      {
        name,
        category,
        description,
        images: files,
        originalPrice,
        displayPrice: discountedPrice,
        size,
      },
      { new: true }
    );

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json({ mesage: error.mesage }, { status: 500 });
  }
}

async function deleteImages(dletedImageFiles) {
  for (const publicId of dletedImageFiles) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      console.log("Image deleted successfully:", result);
    } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
  }
}

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
