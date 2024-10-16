import axios from "axios";
import store from "@/state/store";

import refreshToken from "@/utils/auth/refreshToken";

import { setToken } from "@/state/reducers/auth";
import { handleLogout } from "@/utils/auth/handleLogout";
import { toast } from "sonner";

import { SERVER_URL } from "@/constants";

const protectedAxios = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

// protectedAxios.interceptors.request.use(
//   (config) => {
//     console.log("config", config);
//     return config;
//   },
//   (err) => {
//     console.log(err);
//   },
// );

protectedAxios.interceptors.response.use(
  (response) => response,
  async (err) => {
    console.log(err);
    switch (err.response.status) {
      case 401:
        return err;
      case 403:
        try {
          const originalRequest = err.config;

          const newAccessToken = await refreshToken();
          store.dispatch(setToken(newAccessToken));

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return protectedAxios(originalRequest);
        } catch (err) {
          toast.error("Not logged in");
          handleLogout();
          return err;
        }
    }
  },
);

export default protectedAxios;
