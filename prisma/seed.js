// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // clear old data
  await prisma.books.deleteMany();

  // dummy data - books
  await prisma.books.createMany({
    data: [
      { title: "The Hobbit", author: "J.R.R. Tolkien", read: false },
      { title: "1984", author: "George Orwell", read: false },
      { title: "Pride and Prejudice", author: "Jane Austen", read: false },
    ],
  });

  console.log("Seeding done");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
