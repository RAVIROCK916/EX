import { Outlet } from "@tanstack/react-router";

const Main = () => {
  return (
    <main className="h-screen overflow-y-auto border-x border-neutral-900">
      <div className="mx-auto space-y-6 px-6 py-4 xl:px-12 xl:py-10">
        <Outlet />
      </div>
    </main>
  );
};

export default Main;
