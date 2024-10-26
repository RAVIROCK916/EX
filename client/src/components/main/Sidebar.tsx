import { Link, useLocation } from "@tanstack/react-router";

import { handleLogout } from "@/utils/auth/handleLogout";
import { sidebarLinks } from "@/constants";
import { SignOut } from "phosphor-react";

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <aside className="flex h-screen flex-col justify-between">
      <section className="space-y-3">
        {sidebarLinks.map((link) => {
          const isActive = link.href === pathname;
          return (
            <Link
              key={link.label}
              to={link.href}
              className={`flex items-center gap-4 rounded-md px-4 py-3 transition-all hover:bg-neutral-900 ${isActive && "pointer-events-none bg-neutral-100 font-semibold text-neutral-950"}`}
            >
              <link.icon
                className={`h-6 w-6 stroke-[1.5px] ${isActive && "!stroke-2"}`}
              />
              <p className="hidden text-lg md:block">{link.label}</p>
            </Link>
          );
        })}
      </section>
      <div>
        <Link
          href="/logout"
          onClick={handleLogout}
          className="flex items-center gap-4 rounded-md px-4 py-3 transition-all hover:bg-neutral-900"
        >
          <SignOut className="h-6 w-6" />
          <p>Logout</p>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
