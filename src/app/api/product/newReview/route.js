import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import Review from "@/models/reviewModal";
import User from "@/models/userModel";
import Product from "@/models/productModel";

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
    const { comment, rating, email, productId } = Object.fromEntries(
      data.entries()
    );
    const user = await User.findOne({ email });
    const product = await Product.findById(productId);
    //checks if user with such email exists or not
    if (!user) {
      return NextResponse.json(
        { message: "user not found please try again" },
        { status: 400 }
      );
    }
    //check if product with such id exists or not
    if (!product) {
      return NextResponse.json(
        { message: "product not found please try again" },
        { status: 400 }
      );
    }
    //checks if user added ratings or not
    if (!rating) {
      return NextResponse.json(
        { message: "please give ratings" },
        { status: 400 }
      );
    }
    //if user also added images along with ratings
    //this handle review with images added
    if (!files || files.length === 0) {
      const review = await Review.create({
        comments: comment,
        rating,
        userId: user._id,
        productId,
        //images: imageIds,
      });
      await product.updateAvgRating();
      console.log("review done");
      return NextResponse.json(
        { message: "review added without images" },
        { status: 200 }
      );
    }
    //this part handles reviewing along with images

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
    //it will be an array of images id uploaded t cloudinary
    const imageIds = await uploadImagesToCloudinary(
      fileBuffers,
      "nextShop/product"
    );

    // Here, you can store the image IDs in your MongoDB database
    const newProduct = await Review.create({
      comments: comment,
      rating,
      userId: user._id,
      productId,
      images: imageIds,
    });
    await product.updateAvgRating();
    console.log(product.avgRating, "avg rating ");

    // Return success response
    return NextResponse.json(
      { message: "review added with images" },
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
