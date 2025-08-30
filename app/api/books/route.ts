// app/api/books/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: "Missing book ID" }, { status: 400 });
    }

    await prisma.book.update({
      where: { id },
      data: { read: true },
    });

    return NextResponse.json(
      { message: "Book marked as read" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      select: { id: true, title: true, author: true, read: true },
    });

    if (!books || books.length === 0) {
      return NextResponse.json({ error: "No books found" }, { status: 404 });
    }

    return NextResponse.json(books, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
