import Link from "next/link";
import { usePathname } from "next/navigation";

export const Tab = ({ isActive, href, children, ...props }) => {
  const link_active = "border-b-2 border-orange-500 border-opacity-100";
  const link_class = "text-black text-sm inline-block h-6 px-4";

  return (
    <li
      className={`inline-block transition-all duration-500 border-opacity-0 ${
        isActive ? link_active : ""
      }`}
    >
      <Link className={link_class} href={href} {...props}>
        {children}
      </Link>
    </li>
  );
};

export const Subnav = ({ borderWidth, borderColor, children }) => {
  const nav_class = `w-full h-fit mb-2 px-2 border-b-2 border-gray`;

  return (
    <nav className={nav_class}>
            <ul>{children}</ul>
    </nav>
  );
};
