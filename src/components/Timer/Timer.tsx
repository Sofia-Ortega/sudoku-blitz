import { Dispatch, SetStateAction, useState } from "react";

interface DropdownProps {
  options: number[];
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
}

export default function Timer({
  options,
  selected,
  setSelected,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: number) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex gap-2 justify-between items-center w-full border-b border-slate-700 font-bold text-blue-800 text-5xl py-2 bg-none cursor-pointer"
      >
        <span>{selected}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-slate-600"
        >
          <path d="M6 9 l6 6 6-6 Z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-md rounded-md border border-slate-50">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-blue-800 transition-colors duration-400 text-center"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
