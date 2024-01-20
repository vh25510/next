"use client";
import { useRef } from "react";
import type { MiniLog, Period } from "../ui";
import type { Member } from "@prisma/client";
import toMemberList from "~/app/utils/toMemberList";
import style from "./LogRow.module.css";
import LogAuthorGroup from "./LogAuthorGroup";
import { clsx } from "clsx";

type PropsType = {
  setCurrent: (period: Period) => unknown;
  isCurrent: boolean;
  period: Period;
  members: Member[];
  logs: MiniLog[];
  removeItem: (index: string) => unknown;
  changeLevel: (index: string) => unknown;
  addLog: (logs: Partial<MiniLog>) => unknown;
};

export default function Page({
  isCurrent,
  period,
  setCurrent,
  members,
  logs,
  removeItem,
  changeLevel,
  addLog,
}: PropsType) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <tr
      className={clsx(
        style["row"],
        "transition-all",
        isCurrent && "bg-zinc-500"
      )}
    >
      <td className="border border-slate-700 w-fit transition-all">{period}</td>

      <td
        className="border border-slate-700 transition-all will-change-contents"
        onClick={() => {
          setCurrent(period);
          if (inputRef.current) inputRef.current.hidden = false;
          inputRef.current?.focus();
        }}
      >
        {members.map(({ id: authorId }) => {
          const logsByAuthor = logs.filter((log) => log.authorId === authorId);
          if (logsByAuthor.length === 0) return null;
          return (
            <LogAuthorGroup
              data={logsByAuthor}
              author={
                members.find((author) => authorId === author.id) as Member
              }
              members={members}
              toggleLevel={changeLevel}
              onRemove={removeItem}
              key={authorId}
            />
          );
        })}
        <input
          className="text-black"
          hidden={!isCurrent}
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            toMemberList(
              inputRef.current?.value,
              members.map((member) => member.name)
            ).map((log) => {
              log.memberId++;
              addLog({ ...log, period });
            });
            if (inputRef.current) inputRef.current.value = "";
          }}
        />
      </td>
    </tr>
  );
}
