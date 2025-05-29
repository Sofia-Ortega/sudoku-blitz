import { useState } from "react";
import { AnimatePresence, motion, spring } from "framer-motion";
import { useInput } from "../InputContext";
import CheckmarkIcon from "../../assets/CheckmarkIcon";

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

  const handleCopyMobile = async (shareText: string): Promise<boolean> => {
    if (!navigator?.share) return false;

    try {
      await navigator.share({
        title: "Sudoku Blitz",
        text: shareText,
        url: "https://sofia-ortega/github.io/sudoku-blitz/",
      });

      return true;
    } catch (err) {
      return false;
    }
  };

  const copyToClipBoard = async (shareText: string) => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("and another err" + err);
      console.error("Copy failed:", err);
    }
  };

  const handleCopy = async () => {
    const emoji = randomEmoji();
    const shareText = `${emoji} Sudoku Blitz ${emoji}\n\nScore: ${score}\nAccuracy: ${accuracy}\n\nhttps://sofia-ortega.github.io/sudoku-blitz/`;

    const isMobile =
      typeof navigator !== "undefined" &&
      navigator.userAgent &&
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      const success = await handleCopyMobile(shareText);
      if (success) return;
    }

    copyToClipBoard(shareText);
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
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -10, opacity: 0 }}
            transition={{ type: "spring" }}
            className="absolute flex justify-center w-full bottom-24 text-white font-bold text-sm"
          >
            <div className="w-fit flex gap-2 bg-green-700 py-2 px-12 shadow-md rounded text-white">
              <CheckmarkIcon />
              <div>Copied to clipboard!</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
