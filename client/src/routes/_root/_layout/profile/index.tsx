import protectedAPI from "@/lib/axios/auth";
import User from "@/types/user";

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import Profile from "@/components/main/Profile";

export const Route = createFileRoute("/_root/_layout/profile/")({
  component: ProfilePage,
});

function ProfilePage() {
  const [profile, setProfile] = useState<User>();

  useEffect(() => {
    protectedAPI.get(`/users/profile`).then((res) => {
      setProfile(res.data);
    });
  }, []);

  return profile ? <Profile profile={profile} /> : <div>Loading...</div>;
}
