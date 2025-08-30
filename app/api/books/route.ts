import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();

  await prisma.book.update({
    where: {
      id: body.id,
    },
    data: {
      read: true,
    },
  });

  return Response.json({ message: "Book marked as read" });
}

export async function GET() {
  const books = await prisma.book.findMany({
    select: {
      id: true,
      title: true,
      author: true,
      read: true,
    },
  });
  if (!books) {
    return Response.json({ error: "No books found" });
  }

  return Response.json(books);
}
