import protectedAPI from "@/lib/axios/auth";
import { useContext, useEffect, useRef, useState } from "react";
import type Comment from "@/types/comment";
import { formatComments } from "@/utils";
import UserComment from "./UserComment";
import InputCommentBox from "./InputCommentBox";
import { PostContext } from "@/routes/_root/_layout/post/$postId";

const Comments = () => {
  const [postComments, setPostComments] = useState<Comment[]>([]);
  let comments = useRef<Comment[]>([]);

  const post = useContext(PostContext);

  console.log({ comments });

  useEffect(() => {
    protectedAPI.get(`/posts/${post.id}/comments`).then((res) => {
      setPostComments(formatComments(res.data));
      comments.current = res.data;
    });
  }, []);

  const addComment = (comment: Comment) => {
    comments.current.push(comment);
    setPostComments(postComments.concat(comment));
  };

  return (
    <div className="space-y-6">
      <InputCommentBox isReply={false} addReply={addComment} />
      <div className="space-y-4">
        <h3 className="mb-2 font-medium">{comments.current.length} Comments</h3>
        <div className="space-y-4">
          {postComments.map((comment: Comment) => (
            <UserComment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
      <div className="min-h-96"></div>
    </div>
  );
};
export default Comments;
