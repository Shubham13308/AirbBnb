import React from "react";
import { LuUser } from "react-icons/lu";

const UserIcon = ({ image }) => {
 
  return image ? (
    <img
      src={image}
      alt="User"
      className="w-6 h-6 rounded-full object-cover"
    />
  ) : (
    <LuUser className="w-6 h-6 bg-primary text-white rounded-full p-1" />
  );
};

export default UserIcon;
