"use client";
import React, { useEffect, useState } from "react";
import Book from "./Book";
import { BookType } from "../types/book";

const BookTracker = () => {
  const [books, setBooks] = useState<BookType[]>([]);

  async function getBooks() {
    const data = await fetch("/api/books");
    const books = await data.json();
    setBooks(books);
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="w-1/2 min-h-3/4 bg-gray-300 flex flex-col items-center justify-start p-4">
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
      </div>
    </div>
  );
};

export default BookTracker;
