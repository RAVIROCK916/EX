import { Outlet } from "@tanstack/react-router";
import Search from "./Search";

const Main = () => {
  return (
    <div className="space-y-6">
      <Search />
      <Outlet />
    </div>
  );
};

export default Main;
