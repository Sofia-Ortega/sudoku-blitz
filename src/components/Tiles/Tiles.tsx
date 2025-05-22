import { motion } from "framer-motion";
import InputBox from "./Tile";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const tileVariants = {
  hidden: { y: 0, opacity: 0 },
  visible: {
    y: [-10, 0],
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 800,
      damping: 20,
    },
  },
};

export function Tiles() {
  return (
    <motion.div
      className="flex justify-center items-center m-4 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {Array.from({ length: 9 }, (_, i) => (
        <motion.div key={i} variants={tileVariants}>
          <InputBox num={i + 1} />
        </motion.div>
      ))}
    </motion.div>
  );
}
