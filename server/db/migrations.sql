CREATE DATABASE EX;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TABLES

CREATE TABLE users(
	id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
	name VARCHAR(255),
	username VARCHAR(255) UNIQUE NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	bio TEXT,
	birth_date DATE,
	gender VARCHAR(255),
	location VARCHAR(255),
	personal_link VARCHAR(255),
	followers_count INT DEFAULT 0,
	following_count INT DEFAULT 0,
	profile_picture_url VARCHAR(255),
	cover_picture_url VARCHAR(255),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE followers(
	id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
	user_id uuid NOT NULL,
	follower_id uuid NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UNIQUE (user_id, follower_id)
);

CREATE TABLE posts(
	id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
	user_id uuid NOT NULL REFERENCES users(id),
	caption TEXT NOT NULL,
	image_url VARCHAR(255),
	no_of_likes INT DEFAULT 0,
	no_of_comments INT DEFAULT 0,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE likes(
	id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
	post_id uuid NOT NULL REFERENCES posts(id),
	user_id uuid NOT NULL REFERENCES users(id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UNIQUE (post_id, user_id)
);

CREATE TABLE comments(
	id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
	post_id uuid NOT NULL REFERENCES posts(id),
	user_id uuid NOT NULL REFERENCES users(id),
	body TEXT NOT NULL,
	reply_to uuid REFERENCES comments(id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookmarks(
	id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
	user_id uuid NOT NULL REFERENCES users(id),
	post_id uuid NOT NULL REFERENCES posts(id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UNIQUE (user_id, post_id)
);

-- VIEWS

CREATE VIEW user_view AS
SELECT users.id, users.username, users.email, users.name, users.bio, users.birth_date, users.gender, users.location, users.personal_link, users.followers_count, users.following_count, users.profile_picture_url, users.cover_picture_url, users.created_at
FROM users;

CREATE VIEW user_posts AS
SELECT users.name, users.username, users.email, users.profile_picture_url, posts.*
FROM posts
JOIN users ON posts.user_id = users.id;

CREATE VIEW posts_with_likes AS
SELECT 
    posts.*,
    likes.user_id AS liked_by_user
FROM 
    posts
LEFT JOIN 
    likes ON posts.id = likes.post_id;

CREATE FUNCTION get_posts_with_likes(current_user_id uuid)
RETURNS TABLE (
	id uuid,
	user_id uuid,
	caption text,
	image_url VARCHAR(255),
	created_at timestamp,
	no_of_likes int,
	no_of_comments int,
	username VARCHAR(255),
	email VARCHAR(255),
	profile_picture_url VARCHAR(255),
	liked_by_user boolean
) AS $$
BEGIN
	RETURN QUERY
	SELECT
		posts.*,
		users.username, users.email, users.profile_picture_url,
		COUNT(CASE WHEN likes.user_id = current_user_id THEN 1 ELSE NULL END) > 0 AS liked_by_user
	FROM
		posts
	JOIN
		users ON posts.user_id = users.id
	LEFT JOIN
		likes ON posts.id = likes.post_id
	GROUP BY
		posts.id, users.username;
END;
$$ LANGUAGE plpgsql;
