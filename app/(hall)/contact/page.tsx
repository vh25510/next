import { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className={`${inter.className} text-4xl font-bold text-blue-500`}>
        Contact Us
      </h1>

      <div className="w-1/2 p-8 mt-10 bg-white rounded shadow-lg">
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input className="border p-2 w-full" type="text" id="name" />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input className="border p-2 w-full" type="email" id="email" />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="border p-2 w-full"
              rows={4}
              id="message"
            ></textarea>
          </div>

          <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
