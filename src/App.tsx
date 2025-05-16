import { useRef, useState } from "react";
import "./App.css";
import { Grid } from "./components/Grid";
import Dropdown from "./components/Dropdown";
import { Tiles } from "./components/Tiles";

const randomGrid = (): (number | null)[] => {
  let digits: (number | null)[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const missingIndex = Math.floor(Math.random() * digits.length);
  digits[missingIndex] = null;

  let shuffled = digits
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return shuffled;
};

function App() {
  const [gridNums, setGridNums] = useState<(number | null)[]>(randomGrid());
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const refreshPuzzle = () => {
    if (timer == 0) return;

    setGridNums(randomGrid());
    setScore(score + 1);

    if (!running) {
      startTimer();
      setRunning(true);
    }
  };

  const startTimer = () => {
    setTimer(30);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="bg-sky-100 min-h-screen flex flex-col justify-around items-center gap-10">
      <div className="text-xl text-center">Sudoku Blitz</div>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="font-bold text-slate-700">time:</div>
          <Dropdown options={["15", "30", "45"]} />
        </div>
        <div>
          <Grid gridNums={gridNums} refreshPuzzle={refreshPuzzle} />
        </div>
      </div>
      <Tiles />
    </div>
  );
}

export default App;
