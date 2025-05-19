import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Grid } from "./components/Grid/Grid";
import Timer from "./components/Timer/Timer";
import { Tiles } from "./components/Tiles/Tiles";
import { InputProvider, useInput } from "./components/InputContext";
import SmoothDisappearance from "./components/Test/SmoothDisapperance";

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
  const [playing, setPlaying] = useState(false);

  const { userInput, setUserInput } = useInput();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const refreshPuzzle = () => {
    if (timer == 0) return;

    setGridNums(randomGrid());
    setUserInput("");

    if (!playing) {
      startTimer();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (userInput == "") return;

    let numUserInput = Number(userInput);

    const TOTAL_GRID_SUM = 45;

    const my_sum = gridNums.reduce((acc: number, val) => acc + (val ?? 0), 0);

    if (TOTAL_GRID_SUM - my_sum == numUserInput) {
      setScore(score + 1);
    } else {
      setScore(score - 1);
    }

    refreshPuzzle();
  }, [userInput]);

  const startTimer = () => {
    // setTimer(30);
    // intervalRef.current = setInterval(() => {
    //   setTimer((prev) => {
    //     if (prev <= 1) {
    //       clearInterval(intervalRef.current!);
    //       return 0;
    //     }
    //     return prev - 1;
    //   });
    // }, 1000);
  };

  return (
    <div className="bg-sky-100 min-h-screen flex flex-col justify-around items-center gap-10">
      <div className="text-xl text-center">Sudoku Blitz</div>
      <div className="flex flex-col justify-center items-center gap-4">
        <Timer score={score} />
        <div>
          <Grid gridNums={gridNums} />
        </div>
      </div>
      <Tiles />
    </div>
  );
}

export default App;
