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
  const [score, setScore] = useState(0);

  const refreshPuzzle = () => {
    setGridNums(randomGrid());
    setScore(score + 1);
  };

  return (
    <div className="bg-indigo-900 min-h-screen flex flex-col justify-center items-center gap-10">
      <div className="text-2xl font-bold text-fuchsia-50">Score: {score}</div>
      <Grid gridNums={gridNums} refreshPuzzle={refreshPuzzle} />
    </div>
  );
}

export default App;
