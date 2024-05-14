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
export async function GET(req, { params }) {
  try {
    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 400 }
      );
    }
    const { images } = product;
    if (images && images.length !== 0) {
      try {
        await deleteImages(images);
      } catch (error) {
        return NextResponse.json(
          { message: "Unable to delete images from cloudinary" },
          { status: 400 }
        );
      }
    }
    await Product.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Product deleted " }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ mesage: error.mesage }, { status: 500 });
  }
}
async function deleteImages(images) {
  for (const publicId of images) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      throw error;
    }
  }
}
