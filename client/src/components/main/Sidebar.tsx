import { Link } from "@tanstack/react-router";

import { handleLogout } from "@/utils/auth/handleLogout";

const Sidebar = () => {
  return (
    <aside>
      <Link onClick={handleLogout}>Logout</Link>
    </aside>
  );
};

export default Sidebar;
