type User = {
  id: number;
  username: string;
  email: string;
  name: string;
  bio: string;
  birth_date: string;
  gender: string;
  location: string;
  personal_link: string;
  followers_count: number;
  following_count: number;
  profile_picture_url: string;
  cover_picture_url: string;
  created_at: string;
  is_following?: boolean;
};

export default User;
