import { motion } from "framer-motion";
import { useInput } from "../InputContext";

interface GameOverProps {
  score: number;
  accuracy: number;
  resetGame: () => void;
}

export default function GameOver({
  score,
  accuracy,
  resetGame,
}: GameOverProps) {
  const { timerSelection } = useInput();

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 10,
      }}
      className="text-slate-700"
    >
      <div className="text-center text-3xl font-bold my-2">Good Game!</div>
      <div className="bg-sky-50 w-[396px] h-[369px] rounded-2xl shadow-sm ">
        <div className="flex flex-col justify-between h-full py-4">
          <div className="flex items-center justify-center  text-xl">
            <span className="mr-1">Time:</span>
            <span className="font-bold text-3xl">{timerSelection}</span>
          </div>
          <div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              <div className="text-2xl font-bold text-right self-center ">
                Accuracy:
              </div>
              <div className="self-center text-blue-800 font-bold text-5xl">
                {accuracy.toFixed(0)}%
              </div>
              <div className="text-2xl font-bold text-right self-center ">
                Score:
              </div>
              <div className="self-center text-blue-800 font-bold text-5xl">
                {score}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2  justify-center items-center">
            <button className="bg-purple-800 text-white font-bold w-32 py-0.5 rounded-sm shadow-sm cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
              Share
            </button>
            <button
              onClick={resetGame}
              className=" text-blue-800 border border-blue-800 font-bold w-32 py-0.5 rounded-sm shadow-sm cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
      <div></div>
    </motion.div>
  );
}
