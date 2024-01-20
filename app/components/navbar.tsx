"use client";

import Link from "next/link";
import logout from "./logout";

export default function Navbar({
  isLoggedIn,
  signOut,
}: {
  isLoggedIn?: boolean;
  signOut: () => unknown;
}) {
  return (
    <nav className="bg-zinc-800 p-4 flex justify-between">
      <ul className="flex">
        <li className="mr-6">
          <Link href="/">
            <i className="fa fa-home"></i> Home
          </Link>
        </li>
        <li className="mr-6">
          <Link href="#">
            <i className="fa-solid fa-circle-info"></i> About
          </Link>
        </li>
        <li>
          <Link href="#">
            <i className="fa fa-envelope"></i> Contact
          </Link>
        </li>
      </ul>

      {isLoggedIn ? (
        <ul className="flex">
          <li className="mr-6">
            <Link href="/dashboard">
              <i className="fa fa-tachometer"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link
              href=""
              onClick={async () => {
                logout();
              }}
            >
              <i className="fa fa-sign-out"></i> Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="flex">
          <li className="mr-6">
            <Link href="/signup">
              <i className="fa fa-user-plus"></i> Signup
            </Link>
          </li>
          <li>
            <Link href="/login">
              <i className="fa fa-sign-in"></i> Login
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
