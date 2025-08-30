// app/api/books/add/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, author } = body;

    if (!title || !author) {
      return NextResponse.json(
        { message: "Missing title or author values." },
        { status: 400 }
      );
    }
    const existingBook = await prisma.book.findFirst({
      where: {
        title,
        author,
      },
    });

    if (existingBook) {
      return NextResponse.json(
        { message: "Book already exists" },
        { status: 409 }
      );
    }

    await prisma.book.create({
      data: { title, author, read: false },
    });

    return NextResponse.json({ message: "Book added" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
