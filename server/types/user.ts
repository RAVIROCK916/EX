type User = {
	id: number;
	username: string;
	email: string;
	password: string;
	created_at: string;
	is_following?: boolean;
};

export default User;
