export default function structureComments(comments: any[]) {
  const commentMap: any = {};

  // Create a map of all comments
  comments.forEach((comment) => {
    commentMap[comment.id] = {
      id: comment.id,
      body: comment.body,
      post_id: comment.post_id,
      user: {
        id: comment.user_id,
        name: comment.name,
        username: comment.username,
        profile_picture_url: comment.profile_picture_url,
      },
      replies: [],
      created_at: comment.created_at,
    };
  });

  // Organize comments into a nested structure
  const nestedComments: any = [];
  comments.forEach((comment) => {
    if (comment.reply_to) {
      // If the comment is a reply, add it to its parent's replies array
      const parentComment = commentMap[comment.reply_to];
      if (parentComment) {
        parentComment.replies.push(commentMap[comment.id]);
      }
    } else {
      // If it's a top-level comment, add it to the root array
      nestedComments.push(commentMap[comment.id]);
    }
  });

  return nestedComments;
}
