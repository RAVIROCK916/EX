import Posts from "@/sections/Posts";
import { cachingDecorator } from "@/utils";
import fetchData from "@/utils/fetchData";
import FullBleed from "../global/FullBleed";

const Feed = () => {
  const cachedFetch = cachingDecorator(fetchData);
  return (
    <FullBleed className="-my-4">
      <div className="sticky top-0 z-10 border-b border-borderGray bg-black bg-opacity-65 p-2 text-center text-tertiary backdrop-blur-md">
        <h4 className="font-medium">For you</h4>
      </div>
      <Posts postsUrl="/posts/latest" cachedFetch={cachedFetch} />
    </FullBleed>
  );
};

export default Feed;
