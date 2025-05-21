import { Dispatch, SetStateAction } from "react";

interface Props {
  dailyChallenge: boolean;
  setDailyChallenge: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ dailyChallenge, setDailyChallenge }: Props) {
  return (
    <div className="flex flex-col justify-center gap-1">
      <div className="flex justify-center items-center">
        <h1 className="text-center text-slate-700">Sudoku Blitz: </h1>
        <div
          className={`${
            dailyChallenge ? "text-purple-800" : "text-blue-800"
          }   p-2 border-b-2`}
        >
          <h1>{dailyChallenge ? "Daily Challenge" : "Practice"}</h1>
        </div>
      </div>
      <button
        onClick={() => setDailyChallenge(!dailyChallenge)}
        className={`underline font-bold ${"text-sky-600"}`}
      >
        {!dailyChallenge ? "> Go to Daily Challenge" : "> Go to Practice"}
      </button>
    </div>
  );
}
