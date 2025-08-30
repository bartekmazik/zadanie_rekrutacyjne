"use client";
import React, { useEffect, useState } from "react";
import Book from "./Book";
import { BookType } from "../types/book";
import AddBook from "./AddBook";

const BookTracker = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [books, setBooks] = useState<BookType[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function getBooks() {
    setError(null);

    try {
      const res = await fetch("/api/books");

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message);
      }

      setBooks(data);
    } catch (err: any) {
      console.error("Error fetching books:", err);
      setError(err.message);
    }
  }

  // fetch books
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="w-full md:w-1/2  bg-gray-300 flex flex-col items-center rounded-2xl justify-start p-2 md:p-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-fit cursor-pointer  rounded-lg bg-black text-white mb-6 text-nowrap px-4 py-2"
      >
        Add book
      </button>
      {open && (
        <AddBook
          open={open}
          onClose={() => setOpen(false)}
          refetch={getBooks}
        />
      )}
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
