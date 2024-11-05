import { Outlet } from "@tanstack/react-router";

const Main = () => {
  return (
    <div className="max-w-2xl space-y-6 border-x border-neutral-900 !p-8 lg:!px-12">
      <Outlet />
    </div>
  );
};

export default Main;
