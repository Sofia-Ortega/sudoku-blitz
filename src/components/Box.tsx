import { useEffect, useRef, useState } from "react";

interface Props {
  num: number | null;
  refreshPuzzle: () => void;
  ans: number;
}
export function Box({ num, refreshPuzzle, ans }: Props) {
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    // Take only the last digit if multiple are typed/pasted
    const digit = input.slice(-1);

    if (/^\d$/.test(digit)) {
      setWrong(digit != ans.toString());

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
    <div className="w-32 h-32 border border-indigo-900 flex justify-center items-center">
      {num === null ? (
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          // maxLength={1}
          className={`w-full h-full text-center text-4xl outline-none border-none bg-fuchsia-100 ${
            wrong && value ? "text-red-500 " : "text-black"
          }`}
        />
      ) : (
        <div className="text-4xl">{num}</div>
      )}
    </div>
  );
}
