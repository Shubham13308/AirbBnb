"use client";
import EmptyList from "../home/EmptyList";
export default function PropertyReviewsCard({ property }) {
  if (!property) return null;

  

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div>
        <p className="font-bold text-lg">{property.property_name || property.name}</p>
        <p className="text-sm text-gray-500">{property.tagline}</p>
        <img
          src={property.image}
          alt={property.property_name || property.name}
          className="w-full h-40 object-cover mt-2 rounded"
        />
      </div>

      <div className="mt-4">
        <p className="font-semibold mb-2">Reviews:</p>
        {property.reviews && property.reviews.length > 0 ? (
          property.reviews.map((review) => (
            <div
              key={review._id}
              className="border-t pt-2 mt-2 flex gap-2 items-center"
            >
              {review.user?.image && (
                <img
                  src={review.user.image}
                  alt={review.user.username}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div>
                <p className="font-medium">{review.user?.username || "Anonymous"}</p>
                <p className="text-sm text-gray-600">{review.rating_description}</p>
                <p className="text-sm text-yellow-500">Rating: {review.rating}</p>
              </div>
            </div>
          ))
        ) : (
        <EmptyList/>
        )}
      </div>
    </div>
  );
}
