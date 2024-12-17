import User from "@/types/user";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Profile from "@/components/main/Profile";
import protectedAPI from "@/lib/axios/auth";

export const Route = createFileRoute("/_root/_layout/user/$username")({
  component: Username,
});

function Username() {
  const [profile, setProfile] = useState<User>();

  const { username } = Route.useParams();

  useEffect(() => {
    protectedAPI.get(`/users/${username}/profile`).then((res) => {
      setProfile(res.data);
    });
  }, []);

  return profile ? <Profile profile={profile} /> : <div>Loading...</div>;
}
