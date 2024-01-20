"use server";

import { signOut } from "../utils/auth";

export default async function logout() {
  await signOut();
}
