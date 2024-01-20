import { redirect } from "next/navigation";
import { z } from "zod";
import { auth, signIn } from "~/app/utils/auth";

const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export default async function () {
  if (await auth()) redirect("/dashboard");
  async function login(formData: FormData) {
    "use server";

    const username = formData.get("username");
    const password = formData.get("password");
    const credentials = LoginSchema.parse({ username, password });
    console.log(
      "Sign in: ",
      await signIn("credentials", {
        ...credentials,
        redirect: true,
        redirectTo: "/dashboard",
      })
    );
  }

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      action={login}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          name="username"
          placeholder="viet_hoang123, etc."
        />
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          name="password"
          type="password"
          placeholder="******************"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}
