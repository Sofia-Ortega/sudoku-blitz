interface TileProps {
  num: number;
}

export default function Tile({ num }: TileProps) {
  return (
    <div className="bg-sky-50 w-16 h-16 flex justify-center items-center m-1 rounded-md text-4xl shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      {num}
    </div>
  );
}
