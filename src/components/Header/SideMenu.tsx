import { motion } from "motion/react";
import LoginButton from "./LoginButton";
import SunIcon from "../../assets/SunIcon";
import MyNavLink from "./MyNavLink";
import TargetIcon from "../../assets/TargetIcon";
import SwordsIcon from "../../assets/SwordsIcon";
import StatsIcon from "../../assets/StatsIcon";
import SettingsIcon from "../../assets/SettingsIcon";

function Divider() {
  return <div className="border-b-1 border-b-slate-200"></div>;
}

export default function SideMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ width: 260, opacity: 0 }}
      animate={{ width: 300, opacity: 100 }}
      exit={{ width: 260, opacity: 0, transition: { duration: 0.3 } }}
      className="fixed top-0 left-0 h-full bg-white shadow-lg z-50 py-2 px-10 transition-transform flex flex-col gap-10"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="font-inconsolata text-2xl">Sudoku Blitz</div>
          <div className="font-bold">Streak: 0</div>
        </div>
        <button
          onClick={onClose}
          className="text-center center mb-4 text-2xl rounded-full w-8 h-8"
        >
          x
        </button>
      </div>
      <Divider />
      <div className="flex justify-center items-center">
        <LoginButton />
      </div>
      <Divider />

      <nav className="flex flex-col gap-3">
        <MyNavLink icon={<SunIcon />} label="Daily Challenge" href="/" />
        <MyNavLink icon={<TargetIcon />} label="Practice" href="/practice" />
        <MyNavLink
          icon={<SwordsIcon />}
          label="Battle Royal"
          href="/battle-royal"
        />
      </nav>

      <Divider />

      <nav className="flex flex-col gap-4">
        <MyNavLink icon={<StatsIcon />} label="Stats" href="/stats" />
        <MyNavLink icon={<SettingsIcon />} label="Settings" href="/settings" />
      </nav>
    </motion.div>
  );
}
