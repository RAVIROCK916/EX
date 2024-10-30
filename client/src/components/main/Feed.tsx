import { useEffect, useState } from "react";

import Post from "@/types/post";

import Loader from "../global/Loader";
import { SERVER_URL } from "@/constants";
import protectedAPI from "@/lib/axios/auth";
import PostCard from "./PostCard";

const Feed = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await protectedAPI.get(`${SERVER_URL}/posts/latest`);
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
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Posts</h2>
      {isLoading ? (
        <div className="flex items-center justify-center p-6">
          <Loader />
        </div>
      ) : (
        <ul className="space-y-4">
          {posts.length > 0 &&
            posts.map((post) => <PostCard key={post.id} post={post} />)}
        </ul>
      )}
    </div>
  );
};

export default Feed;
