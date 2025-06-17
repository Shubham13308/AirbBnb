import React from 'react';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const tempDefaultDescription =
  'Glamping Tuscan Style in an Aframe Cabin Tent, nestled in a beautiful olive orchard. AC, heat, Queen Bed, TV, Wi-Fi and an amazing view. Close to Weeki Wachee River State Park, mermaids, manatees, Chassahwitzka River and on the SC Bike Path. Kayaks available for rivers. Bathhouse, fire pit, Kitchenette, fresh eggs. Relax & enjoy fresh country air. No pets please. Ducks, hens and roosters roam the grounds. We have a Pot Cake Rescue from Bimini, Retriever and Pom dog. The space is inspiring and relaxing. Enjoy the beauty of the orchard. Spring trees are in blossom and harvested in Fall. We have a farm store where we sell our farm to table products';

const TextAreaInput = ({ name, labelText, value, onChange }) => {
  return (
    <div className="mb-2 space-y-2">
      <Label htmlFor={name} className="capitalize">
        {labelText || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={5}
        required
        className="leading-loose"
        placeholder={tempDefaultDescription}
      />
    </div>
  );
};

export default TextAreaInput;
