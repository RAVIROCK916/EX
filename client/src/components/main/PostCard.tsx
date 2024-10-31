import Post from "@/types/post";
import { agoTime } from "@/utils/agoTime";

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  const { username, caption, image_url, created_at } = post;

  return (
    <li className="space-y-4 rounded-md bg-neutral-900 p-6">
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <figure className="size-10 rounded-full bg-current"></figure>
          <div className="flex flex-col gap-y-0.5">
            <h3>{username}</h3>
            <span className="text-xs text-neutral-500">
              {agoTime(created_at)}
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <p>{caption}</p>
          {image_url && (
            <figure className="overflow-hidden rounded-md">
              <img src={image_url} alt={caption} />
            </figure>
          )}
        </div>
      </div>
    </li>
  );
};

export default PostCard;
