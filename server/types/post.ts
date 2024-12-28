type Post = {
	id: number;
	user_id: number;
	caption: string;
	image_url: string;
	no_of_likes: number;
	no_of_comments: number;
	created_at: string;
	liked_by_user?: boolean;
	bookmarked_by_user?: boolean;
};

export default Post;
