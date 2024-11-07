import { Outlet } from "@tanstack/react-router";

const Main = () => {
  return (
    <main className="h-screen overflow-y-auto">
      <div className="max-w-2xl space-y-6 border-x border-neutral-900 !p-8 lg:!px-12">
        <Outlet />
      </div>
    </main>
  );
};

export default Main;
