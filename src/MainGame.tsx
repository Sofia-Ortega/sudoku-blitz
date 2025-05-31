import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Grid from "./components/MainGame/Grid/Grid";
import Timer from "./components/MainGame/Timer/Timer";
import Tiles from "./components/MainGame/Tiles/Tiles";
import { useInput } from "./components/MainGame/InputContext";
import Header from "./components/Header/Header";
import GameOver from "./components/MainGame/GameOver/GameOver";

const mulberry32 = (seed: number) => {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const getDailySeed = (): number => {
  const today = new Date().toISOString().slice(0, 10); // e.g. "2025-05-20"
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = today.charCodeAt(i) + ((hash << 5) - hash);
  }

  return hash;
};

interface Props {
  dailyChallenge: boolean;
}

function MainGame({ dailyChallenge }: Props) {
  const [score, setScore] = useState(0);
  const correctCount = useRef<number>(0);
  const attemptCount = useRef<number>(0);
  const [accuracy, setAccuracy] = useState(0.0);

  const [playing, setPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const randomGrid = (): (number | null)[] => {
    let digits: (number | null)[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    let rng: () => number;

    if (dailyChallenge) {
      const seed = getDailySeed() + attemptCount.current;
      rng = mulberry32(seed);
    } else {
      rng = Math.random;
    }

    const missingIndex = Math.floor(rng() * digits.length);
    digits[missingIndex] = null;

    let shuffled = digits
      .map((value) => ({ value, sort: rng() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    return shuffled;
  };

  const [gridNums, setGridNums] = useState<(number | null)[]>(randomGrid());

  const controls = useAnimation();

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
      controls.start({
        x: [0, -4, 4, -4, 4, 0],
        transition: { duration: 0.3 },
      });
    }

    const newAccuracy =
      ((correctCount.current * 1.0) / attemptCount.current) * 100;
    setAccuracy(newAccuracy);

    refreshPuzzle();
  }, [userInput]);

  useEffect(() => {
    resetGame();
  }, [dailyChallenge]);

  return (
    <div className="bg-sky-100 h-dvh w-screen flex flex-col justify-around items-center gap-10">
      <Header dailyChallenge={dailyChallenge} />
      {gameOver ? (
        <>
          <GameOver
            dailyChallenge={dailyChallenge}
            score={score}
            accuracy={accuracy}
            resetGame={resetGame}
          />
          <div></div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center gap-4">
            <Timer
              score={score}
              playing={playing}
              dailyChallenge={dailyChallenge}
              timerFinished={timerFinished}
            />
            <motion.div animate={controls}>
              <Grid gridNums={gridNums} />
            </motion.div>
          </div>
          <Tiles />
        </>
      )}
    </div>
  );
}

export default MainGame;
