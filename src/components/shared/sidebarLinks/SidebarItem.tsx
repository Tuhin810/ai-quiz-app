import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarItem = ({
  icon,
  label,
  isExpanded,
  route,
}: {
  icon: React.ReactNode;
  label: string;
  isExpanded: boolean;
  route: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === route;

  return (
    <Link
      href={route}
      className={clsx(
        "flex items-center border border-gray-300 gap-3 p-3 shadow-sm rounded-xl cursor-pointer transition-all",
        !isExpanded && "justify-center",
        isActive
          ? "bg-blue-500 text-white shadow-md"
          : "bg-white hover:bg-blue-500 hover:text-white"
      )}
    >
      <span className="text-xl">{icon}</span>
      {isExpanded && <span>{label}</span>}
    </Link>
  );
};
