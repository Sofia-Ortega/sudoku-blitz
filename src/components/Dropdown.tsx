import { useState } from "react";

interface DropdownProps {
  options: string[];
}

export default function Dropdown({ options }: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(options[0]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex gap-2 justify-between items-center w-full border-b border-slate-700 font-bold text-blue-800 text-5xl py-2 bg-none"
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
        <div className="absolute z-10 mt-1 w-full bg-white shadow-md rounded-md border border-slate-200">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-blue-800"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
