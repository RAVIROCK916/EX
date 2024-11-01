import protectedAPI from "@/lib/axios/auth";

import type { Method } from "axios";

export const handleAuth = (
  method: Method,
  url: string,
  body: Object,
  token: string | null,
) => {
  try {
    protectedAPI.request({
      method,
      url,
      data: body,
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.log("err", err);
  }
};
