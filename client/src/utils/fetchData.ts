import { SERVER_URL } from "@/constants";
import protectedAPI from "@/lib/axios/auth";

export default async function fetchData(url: string) {
  const response = await protectedAPI.get(`${SERVER_URL}/${url}`);

  const data = await response.data;
  return data;
}
