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
    //retracting data coming in req
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
      warranty,
      stock,
    } = Object.fromEntries(data.entries());

    //Delete images from cloudinary removed by user
    if (dletedImageFiles && dletedImageFiles.length !== 0) {
      try {
        await deleteImages(dletedImageFiles);
      } catch (error) {
        return NextResponse.json(
          { message: "Unable to delete images from cloudinary" },
          { status: 400 }
        );
      }
    }

    //Upload newly added images by user to cloudinary before that converting image file in buffer
    const fileBuffers = [];
    if (newImageFiles.length > 0) {
      for (const file of newImageFiles) {
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

    let newAddedImageIds = [];
    if (fileBuffers.length > 0) {
      const imageIds = await uploadImagesToCloudinary(
        fileBuffers,
        "nextShop/product"
      );
      newAddedImageIds = [...newAddedImageIds, ...imageIds];
    }

    //Combining previous images and newly added images

    files = [...files, ...newAddedImageIds];

    //uploading every new data to db
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
        warranty,
        isOutOfStock: stock,
      },
      { new: true }
    );

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json({ mesage: error.mesage }, { status: 500 });
  }
}

//function for deleting images from cloudinary
async function deleteImages(dletedImageFiles) {
  for (const publicId of dletedImageFiles) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
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
