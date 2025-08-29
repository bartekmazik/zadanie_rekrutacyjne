import Image from "next/image";
import BookTracker from "./components/BookTracker";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-start h-[80vh]">
      <h1 className="text-4xl font-bold text-black mb-2 text-balance">
        {" "}
        Book Tracker{" "}
      </h1>
      <h3 className="text-lg font-sans text-gray-600 text-balance mb-12">
        Making reading simple!
      </h3>
      <BookTracker />
    </section>
  );
}
