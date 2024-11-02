import { Outlet } from "@tanstack/react-router";

const Main = () => {
  return (
    <div className="space-y-6">
      <Outlet />
    </div>
  );
};

export default Main;
