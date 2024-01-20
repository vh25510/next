import type { Member } from "@prisma/client";
import type { MiniLog } from "../ui";
import LogTag from "./LogTag";
import style from "./LogAuthorGroup.module.css";
export default function LogAuthorGroup({
  author,
  data,
  onRemove,
  toggleLevel,
}: {
  onRemove: (id: string) => void;
  toggleLevel: (id: string) => void;
  data: MiniLog[];
  members: Member[];
  author: Member;
}) {
  return (
    <div>
      <div className={`${style["author"]}`}>{author.name}</div>
      {data.map((log) => (
        <LogTag
          log={log}
          key={log.id}
          onRemove={onRemove}
          toggleLevel={toggleLevel}
        />
      ))}
    </div>
  );
}
