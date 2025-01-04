import { useEffect, useState } from "react";

import Post from "@/types/post";

import Loader from "../global/Loader";
import protectedAPI from "@/lib/axios/auth";
import PostCard from "./PostCard";
import FullBleed from "../global/FullBleed";
import { useNavigate } from "@tanstack/react-router";

const Feed = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);

  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await protectedAPI.get(`/posts/latest`);
      const data = await response.data;

      setPosts(data);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Posts</h2>
      {isLoading ? (
        <div className="flex items-center justify-center p-6">
          <Loader />
        </div>
      ) : (
        <FullBleed>
          <ul>
            {posts.length > 0 ? (
              posts.map((post) => (
                <li
                  key={post.id}
                  className="hover:bg-backgroundGray cursor-pointer border-b border-borderGray p-4 px-6 transition-colors first:border-t"
                  onClick={() => navigate({ to: `/post/${post.id}` })}
                >
                  <PostCard post={post} />
                </li>
              ))
            ) : (
              <div className="text-center">No posts found</div>
            )}
          </ul>
        </FullBleed>
      )}
    </div>
  );
};

export default Feed;
