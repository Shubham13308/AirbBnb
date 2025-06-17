function PropertyInfoCard({ property }) {
  // Use provided property or fallback to static data
  const staticProperty = {
    name: "Sunset Villa",
    tagline: "A beautiful villa with ocean views",
    image: "https://via.placeholder.com/400x200?text=Property+Image"
  };

  const finalProperty = property || staticProperty;

  const { name, tagline, image } = finalProperty;

  return (
    <div className="mt-2 border-t pt-2">
      <p className="font-medium">{name}</p>
      <p className="text-sm text-gray-500">{tagline}</p>
      {image && (
        <img
          src={image}
          alt={name}
          className="w-full h-32 object-cover mt-1 rounded"
        />
      )}
    </div>
  );
}

export default PropertyInfoCard;
