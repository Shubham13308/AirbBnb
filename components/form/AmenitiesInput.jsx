'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { amenities } from '@/utils/amenities';

function AmenitiesInput({ value = [], onChange }) {
  const isSelected = (name) => value.includes(name);

  const handleCheckboxChange = (name) => {
    let newAmenities = [];

    if (isSelected(name)) {
      // Remove
      newAmenities = value.filter((item) => item !== name);
    } else {
      // Add
      newAmenities = [...value, name];
    }

    onChange({ name: 'amenities', value: newAmenities });
  };

  return (
    <section>
      <input type="hidden" name="amenities" value={JSON.stringify(value)} />
      <div className="grid grid-cols-2 gap-4">
        {amenities.map((amenity) => (
          <div key={amenity.name} className="flex items-center space-x-2">
            <Checkbox
              id={amenity.name}
              checked={isSelected(amenity.name)}
              onCheckedChange={() => handleCheckboxChange(amenity.name)}
            />
            <label
              htmlFor={amenity.name}
              className="text-sm font-medium leading-none capitalize flex gap-x-2 items-center"
            >
              {amenity.name} <amenity.icon className="w-4 h-4" />
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AmenitiesInput;
