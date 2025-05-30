import { useState, useEffect, useRef } from "react";
import Arrow from "./ArrowSvg";
import DropDownOptions from "./DropDownOptions";
import { motion } from "motion/react";
import { useInput } from "../InputContext";

const animText = {
  initial: { width: 0, opacity: 0 },

  open: {
    width: "auto",
    opacity: 1,
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
  },

  closed: { width: 0, opacity: 0 },
};

const animArrow = {
  initial: { width: 0, opacity: 0 },

  open: {
    width: "auto",
    opacity: 1,
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
  },

  closed: {
    width: 0,
    opacity: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
};

interface DropdownProps {
  score: number;
  playing: boolean;
  dailyChallenge: boolean;
  timerFinished: () => void;
}

export default function Timer({
  score,
  playing,
  dailyChallenge,
  timerFinished,
}: DropdownProps) {
  const DEFAULT_TIMER_TIME = 30;

  const { timerSelection, setTimerSelection } = useInput();

  const TIMER_OPTIONS = [15, 30, 45, 60];

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(
    timerSelection || DEFAULT_TIMER_TIME
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleTimerClick = () => {
    if (!playing && !dailyChallenge) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleSelect = (option: number) => {
    setTimer(option);
    setIsOpen(false);
  };

  const startTimer = () => {
    setTimerSelection(timer);

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          timerFinished();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  useEffect(() => {
    if (!playing) return;

    startTimer();
  }, [playing]);

  useEffect(() => {
    setIsOpen(false);
    if (timer) {
      clearInterval(intervalRef.current!);
      setTimer(DEFAULT_TIMER_TIME);
    }
  }, [dailyChallenge]);

  const animBorder = {
    inital: { width: "100%", height: "0.5px" },
    open: {
      width: "100%",
      height: "0.5px",
      transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
    },
    closed: {
      width: `${Math.abs(score) * 25 + 12}px`,
      height: "8px",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
  };

  return (
    <div>
      <div className="flex items-center">
        <motion.div
          variants={animText}
          animate={!playing ? "open" : "closed"}
          className={"overflow-hidden font-bold text-slate-700"}
        >
          time:
        </motion.div>
        <div></div>

        <motion.div
          transition={{ duration: 0.4 }}
          className="mx-2 relative py-2 flex flex-col justify-center items-center"
        >
          <div
            className={`flex justify-between items-center font-bold text-blue-800 text-5xl select-none ${
              !playing && !dailyChallenge ? "cursor-pointer" : ""
            }`}
            onClick={handleTimerClick}
          >
            <span className="mx-2 ">{timer}</span>
            <motion.div
              variants={animArrow}
              animate={!playing && !dailyChallenge ? "open" : "closed"}
              initial={"closed"}
            >
              <Arrow isOpen={isOpen} />
            </motion.div>
          </div>
          <motion.div
            variants={animBorder}
            animate={!playing ? "open" : "closed"}
            className={`align-middle my-2 max-w-screen overflow-hidden ${
              !playing
                ? "bg-slate-700"
                : score >= 0
                ? "bg-blue-700"
                : "bg-red-700"
            }`}
          />

          {isOpen && (
            <DropDownOptions
              options={TIMER_OPTIONS}
              handleSelect={handleSelect}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
