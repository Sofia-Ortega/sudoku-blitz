import { useState } from "react";
import Arrow from "./ArrowSvg";
import DropDownOptions from "./DropDownOptions";
import { motion, AnimatePresence } from "motion/react";

interface DropdownProps {}

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

export default function Timer({}: DropdownProps) {
  const TIMER_OPTIONS = [15, 30, 45, 60];

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(TIMER_OPTIONS[1]);

  const [playing, setPlaying] = useState(false);

  const handleTimerClick = () => {
    if (!playing) {
      setIsOpen((prev) => !prev);
    }
  };
  const handleSelect = (option: number) => {
    setSelected(option);
    setIsOpen(false);
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

        <motion.div transition={{ duration: 0.4 }} className="mx-2">
          <div
            onClick={handleTimerClick}
            className="flex gap-2 justify-between items-center w-full border-b border-slate-700 font-bold text-blue-800 text-5xl py-2 bg-none cursor-pointer select-none "
          >
            <span>{selected}</span>
            <motion.div
              variants={animArrow}
              animate={!playing ? "open" : "closed"}
            >
              <Arrow isOpen={isOpen} />
            </motion.div>
          </div>

          {isOpen && (
            <DropDownOptions
              options={TIMER_OPTIONS}
              handleSelect={handleSelect}
            />
          )}
        </motion.div>
      </div>
      <button onClick={() => setPlaying(!playing)}>
        click me {playing ? "t" : "f"}
      </button>
    </div>
  );
}
