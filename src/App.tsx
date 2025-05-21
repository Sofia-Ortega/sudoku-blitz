import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Grid } from "./components/Grid/Grid";
import Timer from "./components/Timer/Timer";
import { Tiles } from "./components/Tiles/Tiles";
import { useInput } from "./components/InputContext";
import Header from "./components/Header/Header";
import GameOver from "./components/GameOver/GameOver";

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
  const correctCount = useRef<number>(0);
  const attemptCount = useRef<number>(0);
  const [accuracy, setAccuracy] = useState(0.0);

  const [playing, setPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const { userInput, setUserInput } = useInput();

  const refreshPuzzle = () => {
    setGridNums(randomGrid());
    setUserInput("");

    if (!playing) {
      setPlaying(true);
    }
  };

  const timerFinished = () => {
    setPlaying(false);
    setGameOver(true);
  };

  const resetGame = () => {
    setGridNums(randomGrid());
    setUserInput("");
    setScore(0);

    setPlaying(false);
    setGameOver(false);
  };

  useEffect(() => {
    if (userInput == "") return;

    let numUserInput = Number(userInput);

    const TOTAL_GRID_SUM = 45;

    const my_sum = gridNums.reduce((acc: number, val) => acc + (val ?? 0), 0);
    attemptCount.current += 1;

    if (TOTAL_GRID_SUM - my_sum == numUserInput) {
      correctCount.current += 1;
      setScore(score + 1);
    } else {
      setScore(score - 1);
    }

    const newAccuracy =
      ((correctCount.current * 1.0) / attemptCount.current) * 100;
    setAccuracy(newAccuracy);

    refreshPuzzle();
  }, [userInput]);

  return (
    <div className="bg-sky-100  min-h-screen w-screen flex flex-col justify-around items-center gap-10">
      <Header />
      {gameOver ? (
        <>
          <GameOver score={score} accuracy={accuracy} resetGame={resetGame} />
          <div></div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center gap-4">
            <Timer
              score={score}
              playing={playing}
              timerFinished={timerFinished}
            />
            <div>
              <Grid gridNums={gridNums} />
            </div>
          </div>
          <Tiles />
        </>
      )}
    </div>
  );
}

export default App;
