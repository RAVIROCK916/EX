import Post from "../types/post";
import { getLikesService, getBookmarksService } from "../services/posts";

export default async function updatePostsInfo(posts: Post[], userId: string) {
	if (!userId) return posts;

	// add liked_by_user property to each post
	const likes = await getLikesService(userId);
	console.log(likes);
	posts = posts.map((post) => {
		post.liked_by_user = likes.some((like) => {
			console.log(like.post_id, post.id, like.user_id, userId);
			return like.post_id === post.id && like.user_id === userId;
		});
		return post;
	});

	// add bookmarked_by_user property to each post
	const bookmarks = await getBookmarksService(userId);
	posts = posts.map((post) => {
		post.bookmarked_by_user = bookmarks.some((bookmark) => {
			return bookmark.post_id === post.id && bookmark.user_id === userId;
		});
		return post;
	});
	return posts;
}
