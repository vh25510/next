import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <h1 className="text-5xl font-bold text-black">Welcome!</h1>

      <div className="flex flex-wrap justify-center mt-10">
        <div className="w-64 p-3 m-3 bg-white rounded shadow">
          <h3 className="font-bold text-lg mb-3 text-black">Feature 1</h3>
          <p className="text-black">Description of first great feature</p>
          <button className="px-4 py-2 mt-3 text-black bg-indigo-500 rounded hover:bg-indigo-600">
            Try It
          </button>
        </div>

        <div className="w-64 p-3 m-3 bg-white rounded shadow">
          <h3 className="font-bold text-lg mb-3 text-black">Feature 2</h3>
          <p className="text-black">Description of second awesome feature</p>
          <button className="px-4 py-2 mt-3 text-white bg-purple-500 rounded hover:bg-purple-600">
            Learn More
          </button>
        </div>
      </div>

      <p className="mt-16 text-gray-400">&copy; My Company</p>
    </div>
  );
}
