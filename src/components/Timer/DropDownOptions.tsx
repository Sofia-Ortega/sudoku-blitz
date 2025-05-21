import { motion } from "motion/react";

interface Props {
  options: number[];
  handleSelect: (option: number) => void;
}

export default function DropDownOptions({ options, handleSelect }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0.8 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0.9 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{ transformOrigin: "top" }}
      className="absolute z-10 top-full mt-1 w-full bg-white shadow-md rounded-md border border-slate-50"
    >
      {options.map((option) => (
        <div
          key={option}
          onClick={() => handleSelect(option)}
          className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-blue-800 transition-colors duration-400 text-center select-none"
        >
          {option}
        </div>
      ))}
    </motion.div>
  );
}
