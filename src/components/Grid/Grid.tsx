import { GridBox } from "./GridBox";

interface GridProps {
  gridNums: (number | null)[];
}

export function Grid({ gridNums }: GridProps) {
  return (
    <div className="rounded-2xl overflow-hidden grid grid-cols-3 gap-1 shadow-sm">
      {gridNums.map((num) => (
        <GridBox key={num} num={num} />
      ))}
    </div>
  );
}
