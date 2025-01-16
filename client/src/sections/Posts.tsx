import { useState, useEffect } from "react";
import Post from "@/types/post";
import { PostCard, Loader } from "@/components";
import { useNavigate } from "@tanstack/react-router";

type Props = {
  postsUrl: string;
  cachedFetch: any;
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
        <div>
          {posts.length > 0 ? (
            <ul>
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="xs:p-4 cursor-pointer border-b border-borderGray p-2 transition-colors duration-75 first:border-t hover:bg-[#050505]"
                  onClick={() => navigate({ to: `/post/${post.id}` })}
                >
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center p-6">
              <p className="text-center text-sm text-tertiary-foreground">
                Nothing here...
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
export default Posts;
