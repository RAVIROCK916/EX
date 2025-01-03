import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { RootState } from "@/state/store";
import protectedAPI from "@/lib/axios/auth";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { toast } from "sonner";

type FollowButtonProps = {
  userId: string;
  isFollowing: boolean;
  onFollowChange?: (isFollowing: boolean) => void;
};

const FollowButton = ({
  userId,
  isFollowing,
  onFollowChange,
}: FollowButtonProps) => {
  const currentUserId = useSelector((state: RootState) => state.profile.id);
  const [following, setFollowing] = useState(isFollowing);
  const [loading, setLoading] = useState(false);

  const handleFollowClick = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const endpoint = following ? "unfollow" : "follow";
      await protectedAPI.post(`/users/${endpoint}/${userId}`);

      setFollowing(!following);
      onFollowChange?.(!following);

      toast.success(
        `Successfully ${following ? "unfollowed" : "followed"} user`,
      );
    } catch (error) {
      toast.error("Failed to update follow status");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Don't render button if it's the current user
  if (userId === currentUserId) return null;

  return (
    <Button
      variant={following ? "outline" : "default"}
      className={cn(
        "h-9 rounded-full border transition-all",
        following
          ? "hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-500"
          : "",
        loading ? "cursor-not-allowed opacity-50" : "",
      )}
      onClick={handleFollowClick}
      disabled={loading}
    >
      {loading ? "Loading..." : following ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
