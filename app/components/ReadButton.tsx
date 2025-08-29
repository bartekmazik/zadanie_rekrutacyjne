import { Check, LoaderCircle } from "lucide-react";
import React from "react";

interface ButtonType {
  read: boolean;
  loading: boolean;
  onClick?: () => void;
}

const Button = ({ loading, read, onClick }: ButtonType) => {
  if (loading) {
    return (
      <div
        className="bg-black w-16 aspect-square flex items-center justify-center 
                   rounded-lg shadow-sm text-white p-4"
      >
        <LoaderCircle className="animate-spin" strokeWidth={3} />
      </div>
    );
  }

  if (read) {
    return (
      <div
        className="bg-green-600 w-16 aspect-square flex items-center justify-center 
                   rounded-lg shadow-sm text-white p-4"
      >
        <Check strokeWidth={3} />
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-fit bg-black hover:scale-105 transition-transform
                 flex items-center cursor-pointer justify-center rounded-lg shadow-sm 
                 text-white text-lg px-6 py-3"
    >
      Mark as read
    </button>
  );
};

export default Button;
