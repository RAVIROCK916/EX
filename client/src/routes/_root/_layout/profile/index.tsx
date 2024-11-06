import { Button } from "@/components";
import { SERVER_URL } from "@/constants";
import protectedAPI from "@/lib/axios/auth";
import User from "@/types/user";
import formatDate from "@/utils/formatDate";
import removeProtocol from "@/utils/removeProtocol";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Cake, Link2, MapPin, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_root/_layout/profile/")({
  component: ProfilePage,
});

function ProfilePage() {
  const [profile, setProfile] = useState<User>();

  console.log(profile);

  const { history } = useRouter();

  useEffect(() => {
    protectedAPI.get(`${SERVER_URL}/users/profile`).then((res) => {
      console.log({ data: res.data });

      setProfile(res.data);
    });
  }, []);

  return profile ? (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="cursor-pointer" onClick={() => history.back()}>
          <ArrowLeft className="h-6 w-6" />
        </span>
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>
      <div>
        <figure className="h-48 w-full bg-neutral-500">
          <img src="" alt="" />
        </figure>
      </div>
      <div className="space-y-2 text-sm font-light">
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{profile.name}</h2>
            <p className="text-tertiary-foreground tracking-wide">
              @{profile.username}
            </p>
          </div>
          <Link to="/profile/edit" state={{ profile }}>
            <Button>Edit Profile</Button>
          </Link>
        </div>
        <div>
          <p className="text-base font-normal">{profile.bio}</p>
        </div>
        <div>
          <div className="text-tertiary-foreground flex flex-wrap gap-x-6 gap-y-1 text-sm *:flex *:items-center *:gap-1">
            {profile.location && (
              <p>
                <MapPin className="size-4" />
                <span>{profile.location}</span>
              </p>
            )}
            {profile.personal_link && (
              <p>
                <Link2 className="size-4" />
                <span className="text-blue-300">
                  <Link to={profile.personal_link} target="_blank">
                    {removeProtocol(profile.personal_link)}
                  </Link>
                </span>
              </p>
            )}
            {profile.birth_date && (
              <p>
                <Cake className="size-4" />
                <span>{formatDate(profile.birth_date)}</span>
              </p>
            )}
            <p>
              <Calendar className="size-4" />
              <span>Joined on {formatDate(profile.created_at)}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-x-4">
          <p>
            <span className="font-semibold">{profile.following_count}</span>
            <span className="text-tertiary-foreground"> Following</span>
          </p>
          <p>
            <span className="font-semibold">{profile.followers_count}</span>
            <span className="text-tertiary-foreground"> Followers</span>
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
