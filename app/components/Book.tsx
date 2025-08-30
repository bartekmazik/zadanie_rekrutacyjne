"use client";

import { BookOpen } from "lucide-react";
import React, { useState } from "react";
import Button from "./ReadButton";
import { BookType } from "../types/book";

//extend book props by refetch function
type BookProps = BookType & {
  refetch: () => Promise<void>;
};

const Book = ({ id, title, author, read, refetch }: BookProps) => {
  const [loading, setLoading] = useState(false);

  const handleToggleRead = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        throw new Error(`Marking book failed`);
      }

      await refetch();
    } catch (error) {
      console.error("Error toggling book status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[10vh] bg-gray-100 rounded-xl md:rounded-3xl flex flex-row items-center justify-between shadow-sm p-3 md:p-6">
      <div className="flex flex-row items-center gap-4">
        <div className="bg-white h-12 w-12 md:h-16 md:w-16 flex flex-row items-center justify-center rounded-full shadow-sm">
          <BookOpen className="h-6 w-6 md:h-8 md:w-8" strokeWidth={3} />
        </div>
        <div className="flex flex-col self-start">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          <p className="text-sm font-semibold text-gray-600">{author}</p>
        </div>
      </div>

      <Button read={read} loading={loading} onClick={handleToggleRead} />
    </div>
  );
};

export default Book;
