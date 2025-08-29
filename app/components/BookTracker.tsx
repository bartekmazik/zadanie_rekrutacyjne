import React from "react";
import Book from "./Book";

const BookTracker = () => {
  return (
    <div className="w-1/2 min-h-3/4 bg-gray-300 flex flex-col items-center justify-start p-4">
      {/*Book list */}
      <Book id={1} title="Pan Tadeusz" author="Adam Mickiewicz" read={false} />
    </div>
  );
};

export default BookTracker;
