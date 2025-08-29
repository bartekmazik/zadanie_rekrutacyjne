import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST() {}

export async function GET() {
  const books = await prisma.books.findMany();
  if (!books) {
    return Response.json({ error: "No books found" });
  }

  return Response.json(books);
}
