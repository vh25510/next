import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function RecordSelector({
  recordHeader,
}: {
  recordHeader: {
    date: Date;
    session: number;
  };
}) {
  const { push } = useRouter();
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [date, setDate] = useState(
    recordHeader.date.toISOString().split("T")[0]
  );
  const [session, setSession] = useState(recordHeader.session);
  return (
    <>
      <dialog
        ref={modalRef}
        className="bg-white rounded-md shadow-md"
        onClick={() => {
          modalRef.current?.close();
        }}
        onClose={() => {
          recordHeader.date.toISOString().split("T")[0];

          setSession(recordHeader.session);
        }}
      >
        <form
          name="changeRecordForm"
          className="flex flex-col p-6 gap-4"
          onClick={(e) => e.stopPropagation()}
          onSubmit={(e) => {
            e.preventDefault();
            push(
              `/dashboard/manager?date=${Number(
                new Date(date)
              )}&session=${session}`
            );
          }}
        >
          <label>Date</label>
          <input
            name="dateInput"
            type="date"
            placeholder="Select date"
            className="border border-gray-300 p-2 rounded-md"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          {JSON.stringify(date)}
          <label>Session</label>
          <select
            name="sessionSelect"
            className="border border-gray-300 p-2 rounded-md"
            value={session}
            onChange={(e) => setSession(Number(e.target.value))}
          >
            <option value={0}>Morning</option>
            <option value={1}>Afternoon</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </dialog>
      <button
        type="button"
        onClick={() => {
          modalRef.current?.showModal();
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded text-center"
      >
        Change Record
      </button>
    </>
  );
}
