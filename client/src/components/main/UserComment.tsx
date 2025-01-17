import type Comment from "@/types/comment";
import { ProfilePicture } from "../global/ProfilePicture";
import { Button } from "../ui/button";
import { useState } from "react";
import InputCommentBox from "./InputCommentBox";
import { agoTime } from "@/utils";

type Props = {
  comment: Comment;
};

const UserComment = ({ comment }: Props) => {
  const [currentComment, setCurrentComment] = useState<Comment>(comment);
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  const addReply = (reply: Comment) => {
    setCurrentComment((prev) => {
      return {
        ...prev,
        replies: [...prev.replies, reply],
      };
    });
    setIsReplying(false);
  };

  const handleReply = () => {
    console.log("reply");
    setIsReplying(true);
    setShowReplies(true);
  };

  return (
    <div key={comment.id}>
      <div className="flex gap-4">
        <div>
          <ProfilePicture
            img_url={comment.user.profile_picture_url}
            alt={comment.user.name}
            className="size-8"
          />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-x-4 text-sm text-neutral-500">
            <p className="text-neutral-300">
              {comment.user.name}
              <span className="ml-2 text-textGray">
                @{comment.user.username}
              </span>
            </p>
            <span className="text-xs text-textGray">
              {agoTime(comment.created_at)}
            </span>
          </div>
          <p>{comment.body}</p>

          {isReplying ? (
            <InputCommentBox
              isReply={true}
              reply_to={comment.id}
              addReply={addReply}
              handleCancel={() => {
                setIsReplying(false);
              }}
            />
          ) : (
            <Button
              variant="ghost"
              className="h-auto p-0 text-xs text-textGray hover:bg-transparent hover:text-neutral-100"
              onClick={handleReply}
            >
              Reply
            </Button>
          )}
        </div>
      </div>
      {currentComment.replies.length > 0 && (
        <div className="ml-12">
          {showReplies ? (
            <div className="mt-2">
              {currentComment.replies.map((reply: Comment) => (
                <div
                  key={reply.id}
                  className="border-l border-l-borderGray pl-5 pt-2"
                >
                  <UserComment comment={reply} />
                </div>
              ))}
              <Button
                variant="ghost"
                className="h-auto p-0 text-xs text-textGray hover:bg-transparent hover:text-neutral-100"
                onClick={() => setShowReplies(false)}
              >
                Hide replies
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              className="h-auto p-0 text-xs text-textGray hover:bg-transparent hover:text-neutral-100"
              onClick={() => setShowReplies(true)}
            >
              Show {currentComment.replies.length}{" "}
              {currentComment.replies.length > 1 ? "replies" : "reply"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
export default UserComment;
