import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ImageInput = ({ name = "image", onChange }) => {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        Image
      </Label>
      <Input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        onChange={onChange} 
        className="max-w-xs"
      />
    </div>
  );
};

export default ImageInput;
