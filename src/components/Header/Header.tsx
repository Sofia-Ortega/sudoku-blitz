import { Dispatch, SetStateAction, useState } from "react";
import HamburgerIcon from "../../assets/HamburgerIcon";
import HamburgerButton from "./HamburgerButton";
import HeaderBadge from "./HeaderBadge";
interface Props {
  dailyChallenge: boolean;
  setDailyChallenge: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ dailyChallenge }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="w-full px-4 py-2">
      <div className="w-full flex justify-between items-center">
        <HamburgerButton onClick={() => setIsModalOpen(true)} />
        <h1 className="font-bold text-slate-600">
          {dailyChallenge ? "Daily Challenge" : "Practice"}
        </h1>
        <HeaderBadge />
      </div>
    </header>
  );
}
