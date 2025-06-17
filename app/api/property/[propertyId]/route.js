import { connectDB } from '@/lib/mongodb';
import Property from '@/app/models/Property';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { propertyId } = params;

    const property = await Property.aggregate([
      { $match: { property_id: propertyId } },

      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: 'user_id',
          as: 'user',
        },
      },

      {
        $lookup: {
          from: 'reviews',
          localField: 'property_id',
          foreignField: 'propertyId',
          as: 'reviews',
        },
      },

      {
        $lookup: {
          from: 'users',
          let: { reviewUserIds: '$reviews.user_id' },
          pipeline: [
            {
              $match: {
                $expr: { $in: ['$user_id', '$$reviewUserIds'] },
              },
            },
            {
              $project: {
                _id: 0,
                user_id: 1,
                username: 1,
                image: 1,
              },
            },
          ],
          as: 'reviewUsers',
        },
      },

      {
        $addFields: {
          reviews: {
            $map: {
              input: '$reviews',
              as: 'review',
              in: {
                $mergeObjects: [
                  '$$review',
                  {
                    user: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: '$reviewUsers',
                            as: 'ru',
                            cond: { $eq: ['$$ru.user_id', '$$review.user_id'] },
                          },
                        },
                        0,
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },

      {
        $addFields: {
          reviewsCount: { $size: '$reviews' },
          averageRating: {
            $cond: [
              { $gt: [{ $size: '$reviews' }, 0] },
              {
                $avg: {
                  $map: {
                    input: '$reviews',
                    as: 'r',
                    in: { $toDouble: '$$r.rating' },
                  },
                },
              },
              null,
            ],
          },
        },
      },

      {
        $lookup: {
          from: 'bookings',
          localField: 'property_id',
          foreignField: 'property_id',
          as: 'bookings',
        },
      },

      {
        $unwind: { path: '$user', preserveNullAndEmptyArrays: true },
      },

      {
        $project: {
          'user.password': 0,
          'user._id': 0,
          'user.__v': 0,
          reviewUsers: 0,
        },
      },
    ]);




    if (!property || property.length === 0) {
      return NextResponse.json({ success: false, message: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: property[0] }, { status: 200 });
  } catch (error) {
    console.error('GET_PROPERTY_ERROR:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
