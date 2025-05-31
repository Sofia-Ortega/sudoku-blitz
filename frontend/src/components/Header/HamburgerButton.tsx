import HamburgerIcon from "../../assets/HamburgerIcon";

interface Props {
  onClick?: () => void;
}

export default function HamburgerButton({ onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer hover:bg-slate-300 w-10 h-10 flex justify-center items-center rounded-full transition-colors duration-200"
    >
      <HamburgerIcon />
    </div>
  );
}
