import { SERVER_URL } from "@/constants";
import axios from "axios";

export default async function refreshToken() {
  const res = await axios.post(
    `${SERVER_URL}/auth/refresh`,
    {},
    { withCredentials: true },
  );

  return res.data.accessToken;
}
