export default function ArrowSvg({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-slate-600 ${
        isOpen ? "rotate-180" : ""
      } transition-transform duration-200`}
    >
      <path d="M6 9 l6 6 6-6 Z" />
    </svg>
  );
}
