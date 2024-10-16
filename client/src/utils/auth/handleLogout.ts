import axios from "axios";

import { SERVER_URL } from "@/constants";
import { logout } from "@/state/reducers/auth";
import { router } from "@/App";
import store from "@/state/store";

export const handleLogout = async () => {
  await axios.post(`${SERVER_URL}/auth/logout`, {}, { withCredentials: true });

  store.dispatch(logout());
  router.navigate({ to: "/login" });
};
