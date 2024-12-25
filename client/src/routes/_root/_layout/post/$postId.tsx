import { PostCard } from "@/components";
import { Headline, Comments } from "@/components";
import Post from "@/types/post";
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { createContext } from "react";

export const Route = createFileRoute("/_root/_layout/post/$postId")({
  component: PostPage,
});

export const PostContext = createContext<Post>(null!);

function PostPage() {
  const post = useRouterState({ select: (s) => s.location.state.post });

  return (
    post && (
      <div className="space-y-5">
        <Headline title="Post" />
        <PostContext.Provider value={post}>
          <PostCard post={post} />
          <Comments />
        </PostContext.Provider>
      </div>
    )
  );
}
