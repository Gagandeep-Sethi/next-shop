import Product from "@/models/productModel";

export async function GET(req) {
  try {
    const product = await Product.find();
    if (!product) {
      console.log("product not found");
      return NextResponse.json(
        { message: "Product not found" },
        { status: 400 }
      );
    }
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {}
}
