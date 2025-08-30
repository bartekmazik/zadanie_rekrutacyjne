"use client";
import React, { useEffect, useState } from "react";
import Book from "./Book";
import { BookType } from "../types/book";

const BookTracker = () => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function getBooks() {
    setError(null);

    try {
      const res = await fetch("/api/books");

      if (!res.ok) {
        throw new Error(`Fetching books failed with status ${res.status}`);
      }

      const books = await res.json();
      setBooks(books);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Oops, cannot fetch books. Please try again.");
    }
  }

  // fetch books
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="w-full md:w-1/2 min-h-3/4 bg-gray-300 flex flex-col items-center rounded-2xl justify-start p-2 md:p-4">
      {/*Book list */}
      <div className="flex flex-col gap-4 w-full">
        {books.map((book) => (
          <Book
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            read={book.read}
            refetch={getBooks}
          />
        ))}
        {error && <div className="text-gray-600 text-lg">{error}</div>}
      </div>
    </div>
  );
};

export default BookTracker;
