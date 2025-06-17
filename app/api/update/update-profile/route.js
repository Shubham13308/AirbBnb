import { connectDB } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import User from "@/app/models/User";

export async function PUT(req) {
  try {
    const formData = await req.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const file = formData.get("image");
    const token = formData.get("token");
    const username = formData.get("username");
    

    if (!token) {
      return Response.json({ error: "Unauthorized Access", status: 401 });
    }

    await connectDB();

    if (!email || !password || !file || !username) {
      return Response.json({ error: "Missing required fields", status: 400 });
    }

    // Upload image to Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const cloudinaryUpload = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "user_profiles" }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        })
        .end(buffer);
    });

    // Update user with password, image URL, and username
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        password, // ⚠️ Reminder: hash this before saving in production!
        image: cloudinaryUpload.secure_url,
        username,
      },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json({ error: "User not found", status: 404 });
    }

    return Response.json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    console.error("PUT /user error:", err);
    return Response.json({ error: "Internal Server Error", status: 500 });
  }
}
