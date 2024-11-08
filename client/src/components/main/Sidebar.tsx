import { Link, useLocation } from "@tanstack/react-router";

import { handleLogout } from "@/utils/auth/handleLogout";
import { sidebarLinks } from "@/constants";
import { SignOut } from "phosphor-react";
import { ProfilePicture } from "../global/ProfilePicture";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { username, profile_picture_url } = useSelector(
    (state: RootState) => state.profile,
  );

  return (
    <aside className="sticky top-0 hidden h-screen p-6 sm:block">
      <div className="flex h-full max-w-80 flex-col justify-between">
        <div className="space-y-10">
          <div className="m-5 flex flex-col justify-center gap-y-3">
            <ProfilePicture className="size-20" img_url={profile_picture_url} />
            {/* <p className="text-sm tracking-wide">@{username}</p> */}
          </div>
          <section className="space-y-2">
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
                  <p>{link.label}</p>
                </Link>
              );
            })}
          </section>
        </div>
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
      </div>
    </aside>
  );
};

export default Sidebar;
