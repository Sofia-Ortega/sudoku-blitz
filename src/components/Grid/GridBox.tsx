import { useEffect, useRef, useState } from "react";
import { useInput } from "../InputContext";

interface Props {
  num: number | null;
  refreshPuzzle: () => void;
  ans: number;
}
export function GridBox({ num, refreshPuzzle, ans }: Props) {
  const { userInput, setUserInput } = useInput();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (input == "") {
      setUserInput("");
      return;
    }

    // Take only the last digit if multiple are typed/pasted
    const digit = input.slice(-1);

    if (/^\d$/.test(digit)) {
      if (digit === ans.toString()) {
        console.log("correct");
        refreshPuzzle();
        setUserInput("");
      }
      setUserInput(digit);
    }
  };

  useEffect(() => {
    if (num === null && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select(); // Select existing content
    }
  }, [num]);

  return (
    <div
      className={`w-32 h-32 flex justify-center items-center  ${
        num == null ? "text-violet-800 font-bold bg-indigo-100" : "bg-sky-50"
      }`}
    >
      {num === null ? (
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleChange}
          className={`w-full h-full text-center text-4xl outline-none border-none  `}
        />
      ) : (
        <div className="text-4xl">{num}</div>
      )}
    </div>
  );
}
