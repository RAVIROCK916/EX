import Posts from "@/sections/Posts";

const Feed = () => {
  return (
    <div className="space-y-6 py-4">
      <h2 className="text-3xl font-bold">Your feed</h2>
      <Posts postsUrl="/posts/latest" />
    </div>
  );
};

export default Feed;
