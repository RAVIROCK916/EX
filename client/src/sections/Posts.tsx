import { useState, useEffect } from "react";
import Post from "@/types/post";
import { PostCard, Loader } from "@/components";

type Props = {
  postsUrl: string;
  cachedFetch?: any;
};

const Posts = ({ postsUrl, cachedFetch }: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleFetch(postsUrl);
  }, []);

  async function handleFetch(url: string) {
    setLoading(true);
    try {
      const fetchedPosts = await cachedFetch(url);
      setPosts(fetchedPosts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

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
