"use server";

import { type Log, PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export default async function handler(data: {
  header: {
    date: Date;
    session: number;
  };
  logs: Omit<Log, "id" | "createAt" | "updateAt">[];
}) {
  await prisma.log.deleteMany({
    where: {
      date: data.header.date,
      session: data.header.session,
    },
  });
  for (let log of data.logs) {
    await prisma.log.create({
      data: log,
    });
  }
  revalidatePath("/");
  return;
}
