CREATE DATABASE EX;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TABLES

CREATE TABLE users(
	id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
	username VARCHAR(255) UNIQUE NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	name VARCHAR(255),
	bio TEXT,
	gender VARCHAR(255),
	birth_date DATE,
	profile_picture_url VARCHAR(255),
	cover_picture_url VARCHAR(255),
	personal_link VARCHAR(255),
	location VARCHAR(255),
	followers_count INT DEFAULT 0,
	following_count INT DEFAULT 0,
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
	user_id uuid NOT NULL,
	caption TEXT NOT NULL,
	image_url VARCHAR(255),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CREATE TABLE comments(
-- 	id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
-- 	post_id uuid NOT NULL,
-- 	user_id uuid NOT NULL,
-- 	body TEXT NOT NULL,
-- 	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- 	UNIQUE (post_id, user_id)
-- );

-- CREATE TABLE likes(
-- 	id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
-- 	post_id uuid NOT NULL,
-- 	user_id uuid NOT NULL,
-- 	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- 	UNIQUE (post_id, user_id)
-- );

-- VIEWS

CREATE VIEW user_view AS
SELECT users.id, users.username, users.name, users.email, users.bio, users.gender, users.birth_date, users.profile_picture_url, users.cover_picture_url, users.personal_link, users.location, users.followers_count, users.following_count, users.created_at
FROM users;

CREATE VIEW user_posts AS
SELECT users.username, users.email, posts.*
FROM posts
JOIN users ON posts.user_id = users.id;

CREATE VIEW user_followers AS
SELECT users.username, followers.*
FROM followers