"use client";
import React, { useEffect, useState } from "react";
import Book from "./Book";

const BookTracker = () => {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    async function getBooks() {
      const data = await fetch("/api/books");
      const books = await data.json();
      setBooks(books);
    }
    getBooks();
  }, []);

  return (
    <div className="w-1/2 min-h-3/4 bg-gray-300 flex flex-col items-center justify-start p-4">
      {/*Book list */}
      <Book id={1} title="Pan Tadeusz" author="Adam Mickiewicz" read={false} />
    </div>
  );
};

export default BookTracker;
