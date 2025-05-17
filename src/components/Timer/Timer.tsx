import { useState } from "react";
import Arrow from "./ArrowSvg";
import DropDownOptions from "./DropDownOptions";

interface DropdownProps {}

export default function Timer({}: DropdownProps) {
  const TIMER_OPTIONS = [15, 30, 45, 60];

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(TIMER_OPTIONS[1]);

  const [started, setStarted] = useState(false);

  const handleClick = () => {
    if (!started) {
      setIsOpen((prev) => !prev);
    }
  };
  const handleSelect = (option: number) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="font-bold text-slate-700">time:</div>
        <div className="relative inline-block text-left">
          <div
            onClick={handleClick}
            className="flex gap-2 justify-between items-center w-full border-b border-slate-700 font-bold text-blue-800 text-5xl py-2 bg-none cursor-pointer select-none"
          >
            <span>{selected}</span>
            <Arrow isOpen={isOpen} />
          </div>

          {isOpen && (
            <DropDownOptions
              options={TIMER_OPTIONS}
              handleSelect={handleSelect}
            />
          )}
        </div>
      </div>
      <button onClick={() => setStarted(!started)}>
        click me {started ? "t" : "f"}
      </button>
    </div>
  );
}
