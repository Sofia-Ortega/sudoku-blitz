import { Dispatch, SetStateAction, useState } from "react";
import HamburgerButton from "./HamburgerButton";
import HeaderBadge from "./HeaderBadge";
import SideMenu from "./SideMenu";
import { AnimatePresence, motion } from "motion/react";
interface Props {
  dailyChallenge: boolean;
}

export default function Header({ dailyChallenge }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <header className="w-full px-4 py-2">
      <div className="w-full flex justify-between items-center">
        <HamburgerButton onClick={() => setIsModalOpen(true)} />
        <h1 className="font-bold text-slate-600">
          {dailyChallenge ? "Daily Challenge" : "Practice"}
        </h1>
        <HeaderBadge />
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black opacity-50 z-40"
              onClick={() => setIsModalOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0, transition: { delay: 0.4, duration: 0.3 } }}
            />
            <SideMenu onClose={() => setIsModalOpen(false)} />
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
