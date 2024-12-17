import { useSelector } from "react-redux";
import { ProfilePicture } from "../global/ProfilePicture";
import { Input, Button } from "../";
import { RootState } from "@/state/store";
import { SERVER_URL } from "@/constants";
import protectedAPI from "@/lib/axios/auth";

type Props = {
  postId: string;
};

const Comments = ({ postId }: Props) => {
  const { profile_picture_url } = useSelector(
    (state: RootState) => state.profile,
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    await protectedAPI.post(`${SERVER_URL}/posts/${postId}/comment`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <ProfilePicture img_url={profile_picture_url} />
        <form className="w-full" onSubmit={handleSubmit}>
          <Input placeholder="Add a comment" />
          <Button variant="outline" type="submit">
            Post
          </Button>
        </form>
      </div>
      <div></div>
    </div>
  );
};
export default Comments;
