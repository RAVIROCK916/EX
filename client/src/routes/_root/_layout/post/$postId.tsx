import { PostCard } from "@/components";
import { Headline, Comments } from "@/components";
import { createFileRoute, useRouterState } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/_layout/post/$postId")({
  component: PostPage,
});

function PostPage() {
  const post = useRouterState({ select: (s) => s.location.state.post });
  return (
    post && (
      <div className="space-y-5">
        <Headline title="Post" />
        <PostCard post={post} />
        <Comments postId={post.id} />
      </div>
    )
  );
}
