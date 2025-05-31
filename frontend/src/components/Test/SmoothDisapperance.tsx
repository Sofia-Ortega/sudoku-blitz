import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const anim = {
  initial: { width: 0, opacity: 0 },

  open: {
    width: "auto",
    opacity: 1,
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
  },

  closed: { width: 0, opacity: 0 },
};

const SmoothDisappearanceTailwind = () => {
  const [started, setStarted] = useState(true);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setStarted(!started)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Toggle
      </button>

      <div className="flex items-center justify-center">
        <motion.div
          variants={anim}
          animate={started ? "open" : "closed"}
          className={"bg-green-500 overflow-hidden"}
        >
          time:
        </motion.div>

        <motion.div layout transition={{ duration: 0.4 }} className="mx-2">
          remain
        </motion.div>
      </div>
    </div>
  );
};

export default SmoothDisappearanceTailwind;
