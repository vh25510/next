import { redirect } from "next/navigation";
import UiComponent from "./ui";
import { PrismaClient } from "@prisma/client";
import { auth } from "~/app/utils/auth";

const prisma = new PrismaClient();

export default async function Page({
  searchParams,
}: {
  searchParams: { date: string; session: string };
}) {
  const user = (await auth())?.user;
  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/dashboard");

  const members = await prisma.member.findMany();
  const date = parseInt(searchParams.date);
  const session = parseInt(searchParams.session);
  if (isNaN(date) || isNaN(session)) return <div>Invalid date or session</div>;

  const dDate = Number(new Date(new Date(date).toISOString().slice(0, 10)));
  if (dDate !== date)
    redirect(`/dashboard/manager?date=${dDate}&session=${session}`);
  const logs = await prisma.log.findMany({
    where: {
      date: new Date(date),
      session: session,
    },
    select: {
      id: true,
      memberId: true,
      level: true,
      period: true,
      authorId: true,
      taskId: true,
      date: true,
      session: true,
      member: {
        select: { name: true },
      },
    },
  });
  return (
    <UiComponent
      members={members}
      data={{
        header: {
          date: new Date(date),
          session: session,
        },
        logs: logs.map((log) => ({
          ...log,
          member: undefined,
          memberName: log.member.name,
          id: String(log.id),
        })),
      }}
      userId={members.find((member) => member.name === user.name)?.id}
    />
  );
}
