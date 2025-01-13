import PostForm from "@/components/forms/PostForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/_layout/post/create")({
  component: createPost,
});

function createPost() {
  return (
    <div className="space-y-6 px-6 py-8">
      <h2 className="text-3xl font-bold">Create Post</h2>
      <PostForm />
    </div>
  );
}
