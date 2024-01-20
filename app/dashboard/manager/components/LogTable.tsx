import { useState } from "react";
import { MiniLog, Period } from "../ui";
import LogRow from "./LogRow";
import { Member } from "@prisma/client";

type PropsType = {
  members: Member[];
  changeLevel: (index: string) => void;
  removeItem: (index: string) => void;
  addLog: (logs: Partial<MiniLog>) => void;
  logs: MiniLog[];
};

export default function LogTable({
  addLog,
  changeLevel,
  logs: data,
  members,
  removeItem,
}: PropsType) {
  const [currentPeriod, setCurrentPeriod] = useState<Period>(1);

  return (
    <table className="w-full table-fixed border border-separate border-slate-500">
      <thead>
        <tr className="bg-zinc-950 ">
          <th className="w-10 border border-slate-600">Tiết</th>
          <th className=" border border-slate-600">Nội dung</th>
        </tr>
      </thead>
      <tbody>
        {new Array<Period>(1, 2, 3, 4, 5).map((period) => (
          <LogRow
            isCurrent={period === currentPeriod}
            setCurrent={setCurrentPeriod}
            members={members}
            changeLevel={changeLevel}
            removeItem={removeItem}
            addLog={addLog}
            key={period}
            period={period}
            logs={data.filter((log) => log.period === period)}
          />
        ))}
      </tbody>
    </table>
  );
}
