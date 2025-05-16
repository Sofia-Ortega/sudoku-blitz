import { Box } from "./Box";
interface GridProps {
  gridNums: (number | null)[];
  refreshPuzzle: () => void;
}

export function Grid({ gridNums, refreshPuzzle }: GridProps) {
  let ans = 45; // sum(1 -> 9) = 45
  gridNums.forEach((n) => n && (ans -= n));

  return (
    <div className="bg-sky-50 rounded-xl overflow-hidden grid grid-cols-3  gap-4 p-4">
      {gridNums.map((num, index) => (
        <Box
          key={num}
          num={num}
          index={index}
          refreshPuzzle={refreshPuzzle}
          ans={ans}
        />
      ))}
    </div>
  );
}
