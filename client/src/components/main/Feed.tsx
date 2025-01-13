import Posts from "@/sections/Posts";
import { cachingDecorator } from "@/utils";
import fetchData from "@/utils/fetchData";

const Feed = () => {
  const cachedFetch = cachingDecorator(fetchData);
  return (
    <div className="space-y-6 py-4">
      <h2 className="text-3xl font-bold">Your feed</h2>
      <Posts postsUrl="/posts/latest" cachedFetch={cachedFetch} />
    </div>
  );
};

export default Feed;
