"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type AddBookProps = {
  open: boolean;
  onClose: () => void;
  refetch: () => Promise<void>;
};

// schema
const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
});

type BookFormData = z.infer<typeof bookSchema>;

const AddBook = ({ open, onClose, refetch }: AddBookProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
  });

  if (!open) return null;

  // add book submit
  const onSubmit = async (data: BookFormData) => {
    try {
      const res = await fetch("/api/books/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData?.message);
      }

      // refetch books
      await refetch();

      alert(responseData.message);

      reset(); // clear form
      onClose();
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl w-1/3 min-h-1/3 p-6 flex flex-col">
        <h3 className="text-2xl font-semibold mb-6">Add Book</h3>

        <form
          className="flex flex-col items-center gap-4 flex-1 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-2/3">
            <input
              type="text"
              placeholder="Title"
              className={`border p-2 rounded-md w-full ${
                errors.title ? "border-red-500" : ""
              }`}
              {...register("title")}
            />
            {/*title input error */}
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="w-2/3">
            <input
              type="text"
              placeholder="Author"
              className={`border p-2 rounded-md w-full ${
                errors.author ? "border-red-500" : ""
              }`}
              {...register("author")}
            />
            {/*author input error */}
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">
                {errors.author.message}
              </p>
            )}
          </div>

          <div className="flex justify-center gap-2 mt-auto w-2/3">
            <button
              type="button"
              className="px-4 py-2 rounded-md cursor-pointer bg-gray-300"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md cursor-pointer bg-black text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
