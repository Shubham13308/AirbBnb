import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const PriceInput = ({ value, onChange }) => {
  const name = 'price';

  return (
    <div className='mb-4'>
      <Label htmlFor={name} className='capitalize block mb-1'>
        Price ($)
      </Label>
      <Input
        id={name}
        type='number'
        name={name}
        min={0}
        value={value}
        onChange={(e) => onChange({ name: e.target.name, value: e.target.value })}
        required
      />
    </div>
  );
};

export default PriceInput;
