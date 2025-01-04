import { Outlet } from "@tanstack/react-router";

const Main = () => {
  return (
    <main className="overflow-y-auto border-x border-borderGray">
      <div className="mx-auto space-y-6 px-3 xl:px-6">
        <Outlet />
      </div>
    </main>
  );
};

export default Main;
