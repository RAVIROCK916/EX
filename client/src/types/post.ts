type Post = {
  id: string;
  username: string;
  caption: string;
  image_url: string;
  profile_picture_url: string;
  tags: string[];
  no_of_likes: number;
  no_of_comments: number;
  created_at: string;
  liked_by_user?: boolean;
};

export default Post;
