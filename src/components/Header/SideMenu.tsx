import { motion } from "motion/react";
import LoginButton from "./LoginButton";

function Divider() {
  return <div className="border-b-1 border-b-slate-200"></div>;
}

export default function SideMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 250, opacity: 100 }}
      exit={{ width: 0, opacity: 0, transition: { delay: 0.4, duration: 0.3 } }}
      className="fixed top-0 left-0 h-full bg-white shadow-lg z-50 py-2 px-10 transition-transform flex flex-col gap-10"
    >
      <div className="flex justify-between">
        <div>
          <div className="font-inconsolata">Sudoku Blitz</div>
          <div>Streak: 0</div>
        </div>
        <button onClick={onClose} className="text-right mb-4 text-2xl">
          x
        </button>
      </div>
      <Divider />
      <div className="flex justify-center items-center">
        <LoginButton />
      </div>
      <Divider />

      <nav className="flex flex-col gap-4">
        <a href="#">Daily Challenge</a>
        <a href="#">Practice</a>
        <a href="#">Battle Royal</a>
      </nav>

      <Divider />

      <nav className="flex flex-col gap-4">
        <a href="#">Stats</a>
        <a href="#">Settings</a>
      </nav>
    </motion.div>
  );
}
