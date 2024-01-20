import { redirect } from "next/navigation";
import { auth } from "../utils/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard, your personal space in our website",
};
export default async function Page() {
  const user = (await auth())?.user;
  if (!user) redirect("/login");
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gradient-to-r from-indigo-500 to-pink-500">
        <div className="px-6 py-4">
          <div
            className="font-bold text-2xl mb-2 text-center text-white"
            style={{ animation: "pulse 2s infinite" }}
          >
            {user.name}
          </div>

          <p className="text-white text-lg text-center">
            <span className="font-bold">Role:</span> {user.role}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2 text-center">
          <span className="inline-block bg-white rounded-full px-3 py-1 text-lg font-semibold text-indigo-500 mr-2 mb-2">
            #{user.username}
          </span>
        </div>
      </div>
    </div>
  );
}
