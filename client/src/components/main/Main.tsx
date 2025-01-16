import { Outlet } from "@tanstack/react-router";

const Main = () => {
  return (
    <main className="h-screen flex-1 overflow-y-auto border-x border-borderGray">
      <div className="mx-auto space-y-6 p-4 xl:p-6">
        <Outlet />
      </div>
    </main>
  );
};

export default Main;
