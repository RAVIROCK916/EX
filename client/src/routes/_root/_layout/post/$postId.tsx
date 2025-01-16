import Post from "@/types/post";
import { Headline, Comments, PostCard } from "@/components";
import { createFileRoute, useLocation } from "@tanstack/react-router";
import { createContext } from "react";
import useFetch from "@/hooks/useFetch";
import FullBleed from "@/components/global/FullBleed";

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
      <div className="-my-4 space-y-5">
        <FullBleed>
          <Headline title="Post" />
        </FullBleed>
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
