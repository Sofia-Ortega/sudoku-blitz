import { useState } from "react";
import { AnimatePresence, motion, spring } from "framer-motion";
import { useInput } from "../InputContext";

interface GameOverProps {
  score: number;
  accuracy: number;
  dailyChallenge: boolean;
  resetGame: () => void;
}

export default function GameOver({
  score,
  accuracy,
  dailyChallenge,
  resetGame,
}: GameOverProps) {
  const { timerSelection } = useInput();

  const [copied, setCopied] = useState(false);

  const randomEmoji = (): string => {
    const emojis = [
      "😀",
      "😃",
      "😄",
      "😁",
      "😆",
      "😅",
      "🤣",
      "😂",
      "🙂",
      "🙃",
      "😉",
      "😊",
      "😇",
      "🥰",
      "😍",
      "🤩",
      "😘",
      "😗",
      "😋",
      "😎",
      "🤓",
      "🧐",
      "😒",
      "😞",
      "😔",
      "😢",
      "😭",
      "😤",
      "😡",
      "🤬",
      "🤯",
      "🥶",
      "🥵",
      "😱",
      "🤠",
      "🥳",
      "😺",
      "😸",
      "😹",
      "😻",
      "🙀",
      "😿",
      "🐶",
      "🐱",
      "🐭",
      "🐹",
      "🐰",
      "🦊",
      "🐻",
      "🐼",
      "🐨",
      "🐯",
      "🦁",
      "🐮",
      "🐷",
      "🐸",
      "🐵",
      "🙈",
      "🙉",
      "🙊",
      "🐔",
      "🐧",
      "🐦",
      "🦆",
      "🦅",
      "🦉",
      "🦇",
      "🐺",
      "🦄",
      "🐝",
      "🐛",
      "🦋",
      "🐌",
      "🐞",
      "🐢",
      "🐍",
      "🦎",
      "🦂",
      "🦖",
      "🦕",
      "🦀",
      "🦞",
      "🦐",
      "🦑",
      "🐙",
      "🦧",
      "🐘",
      "🦣",
      "🦒",
      "🦓",
      "🦘",
      "🦬",
      "🐊",
      "🐅",
      "🐆",
      "🐫",
      "🐪",
      "🦙",
      "🦌",
      "🦝",
    ];

    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const handleCopy = async () => {
    const emoji = randomEmoji();

    try {
      await navigator.clipboard.writeText(
        `${emoji} Sudoku Blitz ${emoji}\n\nScore: ${score}\nAccuracy: ${accuracy}\n\nhttps://sofia-ortega.github.io/sudoku-blitz/`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // hide after 2s
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <>
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
        <div className="bg-sky-50 w-[296px] h-[296px] sm:w-[396px] sm:h-[369px] rounded-2xl shadow-sm ">
          <div className="flex flex-col justify-between h-full py-4">
            <div className="flex items-center justify-center text-lg sm:text-xl">
              <span className="mr-1">time:</span>
              <span className="font-bold text-2xl sm:text-3xl">
                {timerSelection}
              </span>
            </div>
            <div>
              <div className="grid grid-cols-2 grid-rows-2 gap-4">
                <div className="text-lg sm:text-2xl font-bold text-right self-center ">
                  Accuracy:
                </div>
                <div className="self-center text-blue-800 font-bold text-4xl sm:text-5xl">
                  {accuracy.toFixed(0)}%
                </div>
                <div className="text-lg sm:text-2xl font-bold text-right self-center ">
                  Score:
                </div>
                <div className="self-center text-blue-800 font-bold  text-4xl sm:text-5xl">
                  {score}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2  justify-center items-center">
              {dailyChallenge && (
                <button
                  onClick={handleCopy}
                  className="bg-purple-800 text-white font-bold w-32 py-0.5 rounded-sm shadow-sm cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Share
                </button>
              )}
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
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring" }}
            className="absolute flex justify-center w-full bottom-24 text-white font-bold text-sm animate-fadeIn"
          >
            <div className="w-fit flex gap-2 bg-green-700 py-2 px-12 shadow-md rounded text-white">
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                fill="#ffffff"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke="#CCCCCC"
                  stroke-width="0.064"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <title>checkmark-circle</title>{" "}
                  <desc>Created with Sketch Beta.</desc> <defs> </defs>{" "}
                  <g
                    id="Page-1"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                    sketch:type="MSPage"
                  >
                    {" "}
                    <g
                      id="Icon-Set"
                      sketch:type="MSLayerGroup"
                      transform="translate(-100.000000, -1139.000000)"
                      fill="#ffffff"
                    >
                      {" "}
                      <path
                        d="M122.027,1148.07 C121.548,1147.79 120.937,1147.96 120.661,1148.43 L114.266,1159.51 L110.688,1156.21 C110.31,1155.81 109.677,1155.79 109.274,1156.17 C108.871,1156.54 108.85,1157.18 109.228,1157.58 L113.8,1161.8 C114.177,1162.2 114.81,1162.22 115.213,1161.84 C115.335,1161.73 122.393,1149.43 122.393,1149.43 C122.669,1148.96 122.505,1148.34 122.027,1148.07 L122.027,1148.07 Z M116,1169 C108.268,1169 102,1162.73 102,1155 C102,1147.27 108.268,1141 116,1141 C123.732,1141 130,1147.27 130,1155 C130,1162.73 123.732,1169 116,1169 L116,1169 Z M116,1139 C107.164,1139 100,1146.16 100,1155 C100,1163.84 107.164,1171 116,1171 C124.836,1171 132,1163.84 132,1155 C132,1146.16 124.836,1139 116,1139 L116,1139 Z"
                        id="checkmark-circle"
                        sketch:type="MSShapeGroup"
                      >
                        {" "}
                      </path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
              <div>Copied to clipboard!</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
