import { Box } from "./Box";

interface RowProps {
  row: (number | null)[];
  refreshPuzzle: () => void;
  ans: number;
}

function Row({ row, refreshPuzzle, ans }: RowProps) {
  return (
    <div className="flex">
      {row.map((num) => (
        <Box key={num} num={num} refreshPuzzle={refreshPuzzle} ans={ans} />
      ))}
    </div>
  );
}

interface GridProps {
  gridNums: (number | null)[][];
  refreshPuzzle: () => void;
}

export function Grid({ gridNums, refreshPuzzle }: GridProps) {
  const flatGrid = gridNums.flat();

  let ans = 45;
  flatGrid.forEach((n) => n && (ans -= n));

  return (
    <div className="bg-sky-50 rounded-xl overflow-hidden border border-amber-100">
      {gridNums.map((row) => (
        <Row row={row} ans={ans} refreshPuzzle={refreshPuzzle} />
      ))}
    </div>
  );
}
