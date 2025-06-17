import { connectDB } from '@/lib/mongodb';
import cloudinary from '@/lib/cloudinary';
import User from '@/app/models/User';
import Counter from '@/app/models/Counter'; 

export async function POST(req) {
  try {
    const formData = await req.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    const file = formData.get('image'); 
    const flag = formData.get('flag');

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ error: 'User already exists' }, { status: 400 });
    }

    let imageUrl = '';

    if (typeof file === 'string') {
      const response = await fetch(file);
      const contentType = response.headers.get('Content-Type');
      if (!contentType || !contentType.startsWith('image/')) {
        return Response.json({ error: 'Invalid image URL' }, { status: 400 });
      }
      const buffer = Buffer.from(await response.arrayBuffer());
      const uploaded = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'nextjs-users' },
          (error, result) => error ? reject(error) : resolve(result)
        ).end(buffer);
      });
      imageUrl = uploaded.secure_url;
    } else {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploaded = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'nextjs-users' },
          (error, result) => error ? reject(error) : resolve(result)
        ).end(buffer);
      });
      imageUrl = uploaded.secure_url;
    }

    
    const counter = await Counter.findByIdAndUpdate(
      { _id: "user_id" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const user_id = `U${counter.seq}`;

    const newUser = new User({
      user_id,
      username: '',
      email,
      password,
      image: imageUrl,
      flag,
    });

    await newUser.save();

    return Response.json({ message: 'User registered successfully', user_id });
  } catch (err) {
    console.error('Registration error:', err);
    return Response.json({ error: 'Registration failed' }, { status: 500 });
  }
}
