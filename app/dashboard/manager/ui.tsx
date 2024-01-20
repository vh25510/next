"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { Log as FullLog, Member } from "@prisma/client";

import "./style.css";
import LogTable from "./components/LogTable";
import RecordSelector from "./components/RecordSelector";
import updateLogs from "~/app/actions/updateLogs";

export type Period = 1 | 2 | 3 | 4 | 5;
const taskId = "talk";

export interface MiniLog extends Omit<FullLog, "createAt" | "updateAt" | "id"> {
  memberName: string;
  id: string;
}

export default function EditorOutline({
  members,
  data,
  userId,
}: {
  userId?: number;
  members: Member[];
  data: {
    header: {
      date: Date;
      session: number;
    };
    logs: MiniLog[];
  };
}) {
  const [currentAuthor, setCurrentAuthor] = useState<number>(userId || 1);
  const [logs, setLogs] = useState<MiniLog[]>(data.logs);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function removeItem(index: string) {
    setLogs((logs) => logs.filter((log) => log.id !== index));
  }

  async function addLog({ memberId, level, period }: Partial<MiniLog>) {
    if (memberId == null || level == null || period == null) return;
    const memberName = members.find((item) => item.id === memberId)?.name;
    if (memberName == null) return;
    if (currentAuthor == null) return;
    const log: MiniLog = {
      memberId,
      memberName,
      level,
      period,
      authorId: currentAuthor,
      taskId,
      date: data.header.date,
      session: data.header.session,
      id: String(Number(new Date())),
    };

    setLogs((logs) => [...logs, log]);
  }

  async function changeLevel(id: string) {
    const newLogs = [...logs];
    const index = newLogs.findIndex((log) => log.id === id);
    if (newLogs[index].level >= 4) newLogs[index].level = 1;
    else newLogs[index].level++;
    setLogs(newLogs);
  }

  return (
    <div className="h-full flex flex-col gap-2 bg-zinc-800 p-2 sm:p-4">
      <div className="flex justify-evenly">
        <RecordSelector
          recordHeader={{
            date: data.header.date,
            session: 0,
          }}
        />
        <select
          className="bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
          value={currentAuthor}
          onChange={(e) => setCurrentAuthor(Number(e.target.value))}
        >
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
      </div>
      <div className="info">
        <LogTable
          addLog={addLog}
          changeLevel={changeLevel}
          logs={logs}
          members={members}
          removeItem={removeItem}
        />
      </div>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 transition-all w-32 h-fit hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          type="submit"
          onClick={async (e) => {
            setLoading(true);
            router.refresh();
            await updateLogs({
              header: {
                date: data.header.date,
                session: data.header.session,
              },
              logs: logs.map((log) => {
                const { id, memberName, ...rest } = log;
                return rest;
              }),
            });
            setLoading(false);
          }}
        >
          {loading ? "Loading..." : "Submit"}
        </button>

        <button
          className="bg-red-500 transition-all w-32 h-fit hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {}}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
