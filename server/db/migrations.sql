CREATE DATABASE EX;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
	id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
	username VARCHAR(255) UNIQUE NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE follows(
	id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
	follower_id uuid NOT NULL,
	following_id uuid NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UNIQUE (follower_id, following_id)
);

CREATE TABLE posts(
	id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
	user_id uuid NOT NULL,
	title VARCHAR(255) NOT NULL,
	body TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UNIQUE (user_id, title)
);

CREATE TABLE comments(
	id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
	post_id uuid NOT NULL,
	user_id uuid NOT NULL,
	body TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UNIQUE (post_id, user_id)
);

CREATE TABLE likes(
	id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
	post_id uuid NOT NULL,
	user_id uuid NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UNIQUE (post_id, user_id)
);