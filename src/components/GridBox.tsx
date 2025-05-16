import { useEffect, useRef, useState } from "react";

interface Props {
  num: number | null;
  refreshPuzzle: () => void;
  ans: number;
}
export function GridBox({ num, refreshPuzzle, ans }: Props) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (input == "") {
      setValue("");
      return;
    }

    // Take only the last digit if multiple are typed/pasted
    const digit = input.slice(-1);

    if (/^\d$/.test(digit)) {
      if (digit === ans.toString()) {
        console.log("correct");
        refreshPuzzle();
        setValue("");
      }
      setValue(digit);
    }
  };

  useEffect(() => {
    if (num === null && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select(); // Select existing content
    }
  }, [num]);

  return (
    <div className={`w-32 h-32 flex justify-center items-center bg-sky-50 `}>
      {num === null ? (
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          className={`w-full h-full text-center text-4xl outline-none border-none  `}
        />
      ) : (
        <div className="text-4xl">{num}</div>
      )}
    </div>
  );
}
