import { SERVER_URL } from "@/constants";
import protectedAPI from "@/lib/axios/auth";
import User from "@/types/user";

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import Profile from "@/components/main/Profile";

export const Route = createFileRoute("/_root/_layout/profile/")({
  component: ProfilePage,
});

type ProfileType = User & { isFollowing: Boolean };

function ProfilePage() {
  const [profile, setProfile] = useState<ProfileType>();

  useEffect(() => {
    protectedAPI.get(`${SERVER_URL}/users/profile`).then((res) => {
      setProfile(res.data);
    });
  }, []);

  return profile ? <Profile profile={profile} /> : <div>Loading...</div>;
}
