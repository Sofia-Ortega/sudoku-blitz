import { useRef, useState } from "react";
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
  const [timer, setTimer] = useState(30);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
    <div className="bg-indigo-900 min-h-screen flex flex-col justify-around items-center gap-10">
      <div className="text-center">
        <div className="text-xl font-bold text-fuchsia-200">
          Seconds: {timer}
        </div>
      </div>
      <div>
        <div className="text-center my-4 text-2xl font-bold text-fuchsia-50">
          Score: {score}
        </div>
        <Grid gridNums={gridNums} refreshPuzzle={refreshPuzzle} />
      </div>
      <div></div>
    </div>
  );
}

export default App;
