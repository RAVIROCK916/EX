import Sidebar from "./Sidebar";

import { Link, useLocation } from "@tanstack/react-router";
import { handleLogout } from "@/utils/auth/handleLogout";
import { sidebarLinks } from "@/constants";
import { SignOut, XLogo } from "@phosphor-icons/react";

const LeftSidebar = () => {
  const { pathname } = useLocation();
  // const { username, profile_picture_url } = useSelector(
  //   (state: RootState) => state.profile,
  // );

  return (
    <Sidebar className="block h-screen">
      <div className="flex h-full max-w-80 flex-col justify-between">
        <div className="space-y-6">
          <div className="p-2 py-8 sm:p-4">
            <figure className="">
              <XLogo className="size-4 sm:size-8" />
            </figure>
            {/* <p className="text-sm tracking-wide">@{username}</p> */}
          </div>
          <section className="space-y-3 sm:space-y-1 md:space-y-2">
            {sidebarLinks.map((link) => {
              const isActive = link.href === pathname;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`flex items-center gap-4 rounded-md p-2 transition-all hover:bg-neutral-900 sm:px-4 sm:py-3 ${isActive && "pointer-events-none bg-neutral-100 font-semibold text-neutral-950"}`}
                >
                  <link.icon
                    className={`xs:size-5 size-4 stroke-[1.5px] sm:size-6 ${isActive && "!stroke-2"}`}
                  />
                  <p className="hidden sm:block">{link.label}</p>
                </Link>
              );
            })}
          </section>
        </div>
        <div>
          <Link
            href="/logout"
            onClick={handleLogout}
            className="flex items-center gap-4 rounded-md p-2 transition-all hover:bg-neutral-900 sm:px-4 sm:py-3"
          >
            <SignOut className="size-4 sm:size-6" />
            <p className="hidden sm:block">Logout</p>
          </Link>
        </div>
      </div>
    </Sidebar>
  );
};

export default LeftSidebar;
