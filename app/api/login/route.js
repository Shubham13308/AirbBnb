import { connectDB } from "@/lib/mongodb";
import User from "@/app/models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const formData = await req.formData();
    const googleauth = formData.get("googleauth");
    const email = formData.get("email");
    const password = formData.get("password");

    await connectDB();
    let user;

    if (googleauth === "1") {
      user = await User.findOne({ email });
      if (!user || user.flag !== "1") {
        return Response.json({ status: 403, message: "Access Denied" });
      }
    } else {
      user = await User.findOne({ email, password });
      if (!user) return Response.json({ status: 401, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, user_id: user.user_id ,name:user.username,image:user.image},
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return Response.json({
      status: 200,
      message: "Login successful",
      token,
      
    });
  } catch (err) {
    console.error("Login Error:", err);
    return Response.json({ status: 500, message: "Internal Server Error" });
  }
}
