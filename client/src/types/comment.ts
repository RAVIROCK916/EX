type Comment = {
  id: string;
  body: string;
  post_id: string;
  user: {
    id: string;
    username: string;
    profile_picture_url: string;
  };
  replies: Comment[];
  created_at: string;
};

export default Comment;
