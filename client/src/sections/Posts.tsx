import { useState, useEffect } from "react";
import Post from "@/types/post";
import { PostCard, Loader } from "@/components";
import FullBleed from "@/components/global/FullBleed";
import { useNavigate } from "@tanstack/react-router";

type Props = {
  postsUrl: string;
  cachedFetch?: any;
};

const Posts = ({ postsUrl, cachedFetch }: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
        <div className="flex items-center justify-center p-6">
          <Loader />
        </div>
      ) : (
        <FullBleed>
          <ul>
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <li
                  key={post.id}
                  className="cursor-pointer border-b border-borderGray p-4 px-6 transition-colors first:border-t hover:bg-backgroundGray"
                  onClick={() => navigate({ to: `/post/${post.id}` })}
                >
                  <PostCard post={post} />
                </li>
              ))
            ) : (
              <p className="text-center text-sm text-tertiary-foreground">
                Nothing here...
              </p>
            )}
          </ul>
        </FullBleed>
      )}
    </section>
  );
};
export default Posts;
