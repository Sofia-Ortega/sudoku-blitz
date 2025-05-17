interface Props {
  options: number[];
  handleSelect: (option: number) => void;
}
export default function DropDownOptions({ options, handleSelect }: Props) {
  return (
    <div className="absolute z-10 mt-1 w-full bg-white shadow-md rounded-md border border-slate-50">
      {options.map((option) => (
        <div
          key={option}
          onClick={() => handleSelect(option)}
          className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-blue-800 transition-colors duration-400 text-center select-none"
        >
          {option}
        </div>
      ))}
    </div>
  );
}
