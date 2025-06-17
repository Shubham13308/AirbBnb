import React from 'react';
import { Label } from '../ui/label';
import { formattedCountries } from '@/utils/countries';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const name = 'country';

const CountriesInput = ({ value, onChange }) => {
  return (
    <div className="mb-2 space-y-2">
      <Label htmlFor={name} className="capitalize">
        Country
      </Label>
      <Select
        value={value}
        onValueChange={(val) => onChange({ name, value: val })}
        required
      >
        <SelectTrigger id={name}>
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent>
          {formattedCountries.map((item) => (
            <SelectItem key={item.code} value={item.name}>
              <span className="flex items-center gap-2">
                {item.flag} {item.name}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountriesInput;
