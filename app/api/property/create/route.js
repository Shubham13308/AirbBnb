import { connectDB } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import Property from "@/app/models/Property";
import { v4 as uuidv4 } from "uuid";
import { Readable } from "stream";
import { verifyToken } from "@/utils/auth";
export async function POST(req) {
  try {
      const { valid, message, status, decoded } = await verifyToken(req);

    if (!valid) {
      return new Response(JSON.stringify({ success: false, message }), { status });
    }
    await connectDB();

    const formData = await req.formData();

    const name = formData.get("name");
    const tagline = formData.get("tagline");
    const price = formData.get("price");
    const category = formData.get("category");
    const country = formData.get("country");
    const guest = formData.get("guest");
    const bedrooms = formData.get("bedrooms");
    const beds = formData.get("beds");
    const baths = formData.get("baths");
    const description = formData.get("description");
    const amenities = JSON.parse(formData.get("amenities"));
    const imageFile = formData.get("image");
    const user_id = formData.get("user_id"); 

     

 

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const readableStream = Readable.from(buffer);

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "property",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      readableStream.pipe(stream);
    });

    const newProperty = await Property.create({
      property_id: uuidv4(),
      property_name: name,
      tagline,
      price,
      category,
      country,
      image: uploadResult.secure_url,
      guest,
      bedrooms,
      beds,
      baths,
      description,
      amenities,
      user_id, 
    });
    
    
    return Response.json({ status: 200, data: newProperty });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ status: 500, message: "Internal Server Error" });
  }
}
