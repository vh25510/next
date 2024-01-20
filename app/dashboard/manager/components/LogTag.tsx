import type { MiniLog } from "../ui";
import style from "./LogTag.module.css";

export default function LogTag({
  log,
  onRemove,
  toggleLevel,
}: {
  log: MiniLog;
  onRemove: (id: string) => unknown;
  toggleLevel: (id: string) => unknown;
}) {
  return (
    <div
      className={`${style.tag} level-${log.level} transition-all `}
      draggable
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={() => {
        console.log(`Hello via ${log.id}`);
      }}
    >
      <div
        onClick={() => {
          toggleLevel(log.id);
        }}
      >
        {log.memberName}
      </div>
      <button
        className={`${style["close-button"]}`}
        onClick={() => {
          console.log(`Remove ${log.id}`);
          onRemove(log.id);
        }}
      >
        ×
      </button>
    </div>
  );
}
