import { useContext, useState } from "react";
import protectedAPI from "@/lib/axios/auth";
import { ProfilePicture } from "../global/ProfilePicture";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PostContext } from "@/routes/_root/_layout/post/$postId";
import Comment from "@/types/comment";
import { toast } from "sonner";

type Props = {
  isReply: boolean;
  reply_to?: string;
  addReply?: (reply: Comment) => void;
  handleCancel?: () => void;
};

const InputCommentBox = ({
  isReply,
  reply_to,
  addReply,
  handleCancel,
}: Props) => {
  const [comment, setComment] = useState("");

  const post = useContext(PostContext);

  const { id, username, profile_picture_url } = useSelector(
    (state: RootState) => state.profile,
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim() === "") {
      toast.error("Comment cannot be empty");
      return;
    }
    console.log("submitted");
    setComment("");
    addReply?.({
      id: Math.random().toString(),
      body: comment,
      post_id: post.id,
      user: {
        id: id!,
        username: username!,
        profile_picture_url: profile_picture_url!,
      },
      replies: [],
      created_at: new Date().toISOString(),
    });

    await protectedAPI.post(`/posts/${post.id}/comment`, {
      comment,
      reply_to,
    });
  };

  return (
    <div className="flex items-center gap-4">
      <ProfilePicture
        img_url={profile_picture_url}
        className={isReply ? "size-8" : ""}
      />
      <form className="flex w-full items-center gap-4" onSubmit={handleSubmit}>
        <Input
          placeholder={isReply ? "Add a reply" : "Add a comment"}
          value={comment}
          className={"w-full " + (isReply ? "h-9" : "")}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          variant="outline"
          size={isReply ? "sm" : "default"}
          type="submit"
        >
          {isReply ? "Reply" : "Post"}
        </Button>
        {isReply && (
          <Button
            variant="outline"
            size={isReply ? "sm" : "default"}
            onClick={() => {
              setComment("");
              handleCancel?.();
            }}
          >
            Cancel
          </Button>
        )}
      </form>
    </div>
  );
};
export default InputCommentBox;
