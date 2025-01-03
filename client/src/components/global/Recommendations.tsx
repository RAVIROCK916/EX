import { USER_URL } from "@/constants/api";
import useFetch from "@/hooks/useFetch";
import User from "@/types/user";
import { ProfilePicture } from "./ProfilePicture";
import FollowButton from "./FollowButton";

const Recommendations = () => {
  const { data } = useFetch(USER_URL);
  return (
    data &&
    data.length > 0 && (
      <div className="rounded-2xl border border-borderGray p-4">
        <h4>Recommendations</h4>
        <div className="space-y-4 py-4">
          {data.slice(0, 3).map((user: User) => (
            <div key={user.id} className="flex items-center gap-x-2">
              <ProfilePicture
                img_url={user.profile_picture_url}
                alt={user.name}
              />
              <div className="flex flex-1 justify-between">
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <span className="text-xs text-textGray">
                    @{user.username}
                  </span>
                </div>
                <div>
                  <FollowButton
                    userId={user.id}
                    isFollowing={user.is_following}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};
export default Recommendations;
