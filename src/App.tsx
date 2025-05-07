import { useState } from "react";
import "./App.css";
import { Grid } from "./components/Grid";

const randomGrid = (): (number | null)[][] => {
  let digits: (number | null)[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const missingIndex = Math.floor(Math.random() * digits.length);
  digits[missingIndex] = null;

  let shuffled = digits
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  const grid: (number | null)[][] = [
    shuffled.slice(0, 3),
    shuffled.slice(3, 6),
    shuffled.slice(6, 9),
  ];

  return grid;
};

function App() {
  const [gridNums, setGridNums] = useState<(number | null)[][]>(randomGrid());

  return (
    <div className="bg-violet-400 min-h-screen flex flex-col justify-center items-center gap-10">
      <Grid gridNums={gridNums} />
      <button onClick={() => setGridNums(randomGrid())}>Click me</button>
    </div>
  );
}

export default App;
