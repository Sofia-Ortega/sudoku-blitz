import { NavLink } from "react-router";

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

export default function MyNavLink({ icon, label, href }: NavLinkProps) {
  const basicLinkStyle =
    "hover:bg-blue-50 px-2 py-2 rounded-sm transition-colors duration-200";
  const activeLinkStyle = basicLinkStyle + " " + " bg-blue-100 text-white";

  return (
    <NavLink
      to={href}
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
