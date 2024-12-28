import { useState, useEffect } from "react";
import Post from "@/types/post";
import protectedAPI from "@/lib/axios/auth";
import { PostCard, Loader } from "@/components";

type Props = {
  userId: string;
};

const Posts = ({ userId }: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      protectedAPI.get(`/posts/user/${userId}`).then((res) => {
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
      ) : posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p className="text-center text-sm text-tertiary-foreground">
          Nothing posted yet
        </p>
      )}
    </section>
  );
};
export default Posts;
