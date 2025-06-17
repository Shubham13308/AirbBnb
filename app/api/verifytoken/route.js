import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; 

export async function POST(req) {
  try {
    const formData = await req.formData();
    const token = formData.get('token');

    if (!token) {
      return NextResponse.json(
        { message: "Token is missing" }, 
        { status: 400 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    return NextResponse.json(
      { decoded },
      { status: 200 }
    );
  } catch (err) {
    const message = err.name === "TokenExpiredError" 
      ? "Token expired" 
      : "Invalid token";

    return NextResponse.json(
      { message, error: err.message },
      { status: 401 }  
    );
  }
}
