import { BookOpenCheck, Check, LoaderCircle } from "lucide-react";
import React from "react";

interface ButtonType {
  read: boolean;
  loading: boolean;
  onClick?: () => void;
}

const Button = ({ loading, read, onClick }: ButtonType) => {
  // loading button
  if (loading) {
    return (
      <div
        className="bg-black w-12 h-12 md:w-16 md:h-16 aspect-square flex items-center justify-center 
                   rounded-lg shadow-sm text-white p-4"
      >
        <LoaderCircle className="animate-spin" strokeWidth={3} />
      </div>
    );
  }

  // already read label
  if (read) {
    return (
      <div
        className="bg-green-600 w-12 h-12 md:w-16 md:h-16 aspect-square flex items-center justify-center 
                   rounded-lg shadow-sm text-white p-4"
      >
        <Check strokeWidth={3} />
      </div>
    );
  }

  // mark as read button
  return (
    <button
      onClick={onClick}
      className="w-12 h-12 md:h-fit md:w-fit bg-black hover:scale-105 transition-transform
                 flex items-center cursor-pointer justify-center rounded-lg shadow-sm 
                 text-white md:text-lg px-6 py-3"
    >
      <span className="hidden md:block">Mark as read</span>
      <div className="md:hidden">
        <BookOpenCheck />
      </div>
    </button>
  );
};

export default Button;
