import Post from "@/types/post";

type Props = {
  post: Post;
};

const PostPageCard = ({ post }: Props) => {
  return <div>{post.caption}</div>;
};
export default PostPageCard;
