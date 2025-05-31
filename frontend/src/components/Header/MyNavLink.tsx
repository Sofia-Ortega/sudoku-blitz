import { NavLink } from "react-router";

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  onClick?: () => void;
}

export default function MyNavLink({
  icon,
  label,
  href,
  onClick,
}: NavLinkProps) {
  const basicLinkStyle =
    " px-2 py-2 rounded-sm transition-colors duration-200 border-1 border-none hover:shadow-md hover:border-slate-700";
  const activeLinkStyle = basicLinkStyle + " " + " bg-blue-50";

  return (
    <NavLink
      to={href}
      onClick={onClick}
      className={({ isActive }) =>
        isActive ? activeLinkStyle : basicLinkStyle
      }
    >
      <div className="flex items-center gap-3 text-slate-700">
        <div className="w-6 ">{icon}</div>
        <div>{label}</div>
      </div>
    </NavLink>
  );
}
