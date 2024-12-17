import { useState, useEffect } from "react";
import Post from "@/types/post";
import protectedAPI from "@/lib/axios/auth";
import { SERVER_URL } from "@/constants";
import { PostCard, Loader } from "@/components";

type Post_Type = Post & { liked_by_user: boolean };

const Posts = () => {
  const [posts, setPosts] = useState<Post_Type[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      protectedAPI.get(`${SERVER_URL}/posts`).then((res) => {
        setPosts(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <section className="space-y-6">
      {loading ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : posts ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <div>No posts created yet</div>
      )}
    </section>
  );
};
export default Posts;
