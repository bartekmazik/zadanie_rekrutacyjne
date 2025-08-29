import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const books = await prisma.books.findMany();
  return Response.json(books);
}
