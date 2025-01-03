import Recommendations from "../global/Recommendations";
import Sidebar from "./Sidebar";

const RightSidebar = () => {
  return (
    <Sidebar className="sm:hidden lg:block">
      <Recommendations />
    </Sidebar>
  );
};
export default RightSidebar;
