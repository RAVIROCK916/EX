import Posts from "@/sections/Posts";
import { cachingDecorator } from "@/utils";
import fetchData from "@/utils/fetchData";
import FullBleed from "../global/FullBleed";

const Feed = () => {
  const cachedFetch = cachingDecorator(fetchData);
  return (
    <FullBleed className="-my-4">
      <div className="sticky top-0 z-10 bg-black bg-opacity-65 p-4 text-center text-tertiary backdrop-blur-md">
        <h3 className="font-semibold">For you</h3>
      </div>
      <Posts postsUrl="/posts/latest" cachedFetch={cachedFetch} />
    </FullBleed>
  );
};

export default Feed;
