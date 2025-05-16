import { useEffect, useRef, useState } from "react";

interface Props {
  num: number | null;
  index: number;
  refreshPuzzle: () => void;
  ans: number;
}
export function Box({ num, index, refreshPuzzle, ans }: Props) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const showRightBorder = (index + 1) % 3 != 0;
  const showBottomBorder = index < 6;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

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
    <div
      className={`w-32 h-32 flex justify-center items-center  
        ${showRightBorder ? "border-r" : ""} 
        ${showBottomBorder ? "border-b" : ""} 
        border-blue-70`}
    >
      {num === null ? (
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          // maxLength={1}
          className={`w-full h-full text-center text-4xl outline-none border-none  `}
        />
      ) : (
        <div className="text-4xl">{num}</div>
      )}
    </div>
  );
}
