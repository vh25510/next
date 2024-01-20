import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "~/app/utils/auth";

const userSchema = z.object({
  username: z.string(),
  password: z.string(),
  memberId: z.coerce.number(),
});

const prisma = new PrismaClient();

export default async function () {
  if (await auth()) redirect("/dashboard");

  async function handleSubmit(formData: FormData) {
    "use server";
    const data = userSchema.parse({
      username: formData.get("username"),
      password: formData.get("password"),
      memberId: formData.get("memberId"),
    });
    try {
      await prisma.user.create({
        data: {
          memberId: data.memberId,
          role: "user",
          username: data.username,
          hashedPassword: await hash(data.password, 10),
        },
      });
    } catch (e) {
      console.log(e);
    }
    console.log(JSON.stringify(data));
    redirect("/login");
  }

  return (
    <div className="bg-pink-200 flex justify-center">
      <form
        className="bg-blue-100 flex flex-col space-y-4 max-w-md p-4 rounded-lg shadow-md"
        action={handleSubmit}
      >
        <label className="flex flex-col text-red-500">
          Username:
          <input
            className="border border-gray-400 p-2 rounded bg-green-100 text-purple-800"
            type="text"
            name="username"
          />
        </label>
        <label className="flex flex-col text-yellow-300">
          Member ID:
          <input
            className="border border-gray-400 p-2 rounded bg-orange-200 text-green-900"
            type="number"
            name="memberId"
          />
        </label>
        <label className="flex flex-col text-blue-800">
          Password:
          <input
            className="border border-gray-400 p-2 rounded bg-red-100 text-black"
            type="password"
            name="password"
          />
        </label>
        <button className="bg-pink-500 text-white p-2 rounded" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
