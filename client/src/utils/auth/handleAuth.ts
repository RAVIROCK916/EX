import protectedAxios from "@/lib/axios/auth";

import type { Method } from "axios";

export const handleAuth = (
  method: Method,
  url: string,
  body: Object,
  token: string | null,
) => {
  try {
    protectedAxios.request({
      method,
      url,
      data: body,
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.log("err", err);
  }
};
