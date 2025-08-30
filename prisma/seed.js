// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // clear old data
  await prisma.book.deleteMany();

  // dummy data - books
  await prisma.book.createMany({
    data: [
      { title: "Hobbit", author: "J.R.R. Tolkien", read: false },
      { title: "1984", author: "George Orwell", read: false },
      { title: "Zbrodnia i kara", author: "Fiodor Dostojewski", read: false },
      { title: "Pan Tadeusz", author: "Adam Mickiewicz", read: false },
      { title: "Lalka", author: "Boleslaw Prus", read: false },
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
