import axios from "axios";
import store from "@/state/store";

import refreshToken from "@/utils/auth/refreshToken";

import { setToken } from "@/state/reducers/auth";
import { handleLogout } from "@/utils/auth/handleLogout";
import { toast } from "sonner";

import { SERVER_URL } from "@/constants";

const protectedAPI = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

protectedAPI.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err),
);

protectedAPI.interceptors.response.use(
  (response) => response,
  async (err) => {
    switch (err.response.status) {
      case 401:
        return err;
      case 403:
        try {
          const originalRequest = err.config;

          const newAccessToken = await refreshToken();
          store.dispatch(setToken(newAccessToken));

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return protectedAPI(originalRequest);
        } catch (err) {
          toast.error("Not logged in");
          handleLogout();
          return err;
        }
    }
  },
);

export default protectedAPI;
