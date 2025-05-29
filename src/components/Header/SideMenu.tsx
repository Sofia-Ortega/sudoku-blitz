import { motion } from "motion/react";

export default function SideMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 300, opacity: 100 }}
      exit={{ width: 0, opacity: 0, transition: { delay: 0.4, duration: 0.3 } }}
      // initial={{ x: -100 }}
      // animate={{ x: 0 }}
      // exit={{ x: -100, opacity: 0 }}
      // transition={{ type: "spring" }}
      className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-4 transition-transform"
    >
      <button onClick={onClose} className="text-right mb-4">
        Close
      </button>
      <nav className="flex flex-col gap-4">
        <a href="#">Home</a>
        <a href="#">Profile</a>
        <a href="#">Settings</a>
      </nav>
    </motion.div>
  );
}
