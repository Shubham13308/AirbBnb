import { connectDB } from '@/lib/mongodb';
import Booking from '@/app/models/Booking';
import { verifyToken } from '@/utils/auth';

export async function POST(req) {
  try {
    const { valid, message, status, decoded } = await verifyToken(req);

    if (!valid) {
      return new Response(JSON.stringify({ success: false, message }), {
        status,
      });
    }

    const booked_by = decoded?.user_id;
    if (!booked_by) {
      return new Response(
        JSON.stringify({ success: false, message: 'User ID missing in token' }),
        { status: 401 }
      );
    }

    await connectDB();

    const formData = await req.formData();
    const bookingFlag = formData.get('booking');

    if (!bookingFlag) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing booking flag' }),
        { status: 400 }
      );
    }

    const bookings = await Booking.aggregate([
      {
        $match: { user_id: booked_by },
      },
      {
        $lookup: {
          from: 'properties',
          localField: 'property_id',
          foreignField: 'property_id',
          as: 'propertyDetails',
        },
      },
    ]);

    return new Response(JSON.stringify({ success: true, data: bookings,  status: 200 }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error in booking fetch:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
