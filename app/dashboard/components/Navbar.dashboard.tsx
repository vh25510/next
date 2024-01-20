import Link from "next/link";
import logout from "~/app/components/logout";
import { auth, signOut } from "~/app/utils/auth";

export default async function Navbar() {
  const user = (await auth())?.user;

  return (
    <nav className="flex flex-col bg-gray-800">
      <div className="flex flex-col items-center justify-between max-w-2xl mx-auto p-2 sm:p-4 h-full transition-all">
        <ul className="flex flex-col gap-4 text-gray-200">
          <li>
            <Link
              href="/"
              className=" hover:text-gray-400 transition-colors px-2 py-1 rounded-md text-sm font-medium"
            >
              <i className="fa fa-home"></i>{" "}
              <span className="hidden sm:inline">Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/manager"
              className=" hover:text-gray-400 transition-colors px-2 py-1 rounded-md text-sm font-medium"
            >
              <i className="fa fa-tachometer"></i>{" "}
              <span className="hidden sm:inline">Manager</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className=" hover:text-gray-400 transition-colors px-2 py-1 rounded-md text-sm font-medium"
            >
              <i className="fa fa-envelope"></i>{" "}
              <span className="hidden sm:inline">Contact</span>
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col gap-4 text-gray-200">
          <li>
            <Link href="#">
              <i className="fa-solid fa-user"></i>{" "}
              <span className="hidden sm:inline capitalize">
                {user?.name?.toLowerCase() || "Account"}
              </span>
            </Link>
          </li>
          <li>
            <Link href="/api/auth/signout">
              <i className="fa-solid fa-right-from-bracket"></i>{" "}
              <span className="hidden sm:inline">Log out</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
