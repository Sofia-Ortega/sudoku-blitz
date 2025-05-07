import { Box } from "./Box";

function Row({ row }: { row: number[] }) {
  return (
    <div className="flex">
      {row.map((num) => (
        <Box key={num} num={num} />
      ))}
    </div>
  );
}

export function Grid({ gridNums }: { gridNums: (number | null)[][] }) {
  return (
    <div className="bg-fuchsia-200">
      {gridNums.map((row) => (
        <Row row={row} />
      ))}
    </div>
  );
}
