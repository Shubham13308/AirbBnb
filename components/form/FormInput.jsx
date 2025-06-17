import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const FormInput = ({ label, name, type, value, onChange, placeholder, required }) => {
  return (
    <div className='mb-4'>
      <Label htmlFor={name} className='capitalize block mb-1'>
        {label || name}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default FormInput;
