import protectedAPI from "@/lib/axios/auth";

export default async function fetchData(url: string) {
  const response = await protectedAPI.get(url);

  const data = await response.data;
  return data;
}
