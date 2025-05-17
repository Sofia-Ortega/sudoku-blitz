import { useState } from "react";
import Arrow from "./ArrowSvg";
import DropDownOptions from "./DropDownOptions";
import { motion } from "motion/react";

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
  const [width, setWidth] = useState<number>(12);

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

  const animBorder = {
    inital: { width: "100%", height: "0.5px" },
    open: {
      width: "100%",
      height: "0.5px",
      transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
    },
    closed: {
      width: `${width}px`,
      height: "8px",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    // width: `${width}px`,
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
              !playing ? "cursor-pointer" : ""
            }`}
            onClick={handleTimerClick}
          >
            <span className="mx-2 ">{selected}</span>
            <motion.div
              variants={animArrow}
              animate={!playing ? "open" : "closed"}
            >
              <Arrow isOpen={isOpen} />
            </motion.div>
          </div>
          <motion.div
            variants={animBorder}
            animate={!playing ? "open" : "closed"}
            className="align-middle bg-slate-600 my-2"
          />

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
      <div>
        <button
          className="bg-sky-700 text-white px-2 rounded-sm mx-2"
          onClick={() => setWidth(width + 50)}
        >
          ADD WIDTh
        </button>
        <button
          className="bg-sky-700 text-white px-2 rounded-sm mx-2"
          onClick={() => setWidth(width - 50)}
        >
          REMOVE WIDTh
        </button>
      </div>
    </div>
  );
}
