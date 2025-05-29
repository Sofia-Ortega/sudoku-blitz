import { useInput } from "../InputContext";

interface TileProps {
  num: number;
}

export default function Tile({ num }: TileProps) {
  const { setUserInput } = useInput();
  const handleClick = () => {
    setUserInput(`${num}`);
  };
  return (
    <div
      onClick={handleClick}
      className="bg-sky-50 w-10 h-10 sm:w-16 sm:h-16 flex justify-center items-center m-0.5 sm:m-1 rounded-md text-2xl sm:text-4xl text-slate-700 shadow-lg cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
    >
      {num}
    </div>
  );
}
