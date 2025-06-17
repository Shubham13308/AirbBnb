import React from 'react';
import { Label } from '../ui/label';
import { categories } from '@/utils/categories';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const CategoriesInput = ({ value, onChange }) => {
  const name = 'category';

  return (
    <div className='mb-2 space-y-2'>
      <Label htmlFor={name} className='capitalize'>
        Categories
      </Label>
      <Select
        value={value}
        onValueChange={(val) => onChange(val)}
        required
      >
        <SelectTrigger id={name}>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((item) => (
            <SelectItem key={item.label} value={item.label}>
              <span className='flex items-center gap-2'>
                <item.icon /> {item.label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};


export default CategoriesInput;
