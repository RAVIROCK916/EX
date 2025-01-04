import Post from "@/types/post";
import { Headline, Comments, PostCard } from "@/components";
import PostPageCard from "@/components/main/PostPageCard";
import {
  createFileRoute,
  useLocation,
  useRouterState,
} from "@tanstack/react-router";
import { createContext } from "react";
import useFetch from "@/hooks/useFetch";

export const Route = createFileRoute("/_root/_layout/post/$postId")({
  component: PostPage,
});

export const PostContext = createContext<Post>(null!);

function PostPage() {
  const location = useLocation();
  const postId = location.pathname.split("/").pop();

  const { data: post } = useFetch(`/posts/${postId}`, [postId]);
  console.log(post);

  return (
    post && (
      <div className="space-y-5">
        <Headline title="Post" />
        <PostContext.Provider value={post}>
          <div className="space-y-8">
            <PostCard post={post} />
            <Comments />
          </div>
        </PostContext.Provider>
      </div>
    )
  );
}
