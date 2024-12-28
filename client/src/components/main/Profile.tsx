import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import useDebounce from "@/hooks/useDebounce";

import protectedAPI from "@/lib/axios/auth";

import User from "@/types/user";
import Post from "@/types/post";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FullBleed from "@/components/global/FullBleed";
import { Button } from "@/components";

import formatDate from "@/utils/formatDate";
import removeProtocol from "@/utils/removeProtocol";

import Posts from "@/sections/Posts";
import { ProfilePicture } from "@/components/global/ProfilePicture";

import { Link } from "@tanstack/react-router";

import { Cake, Link2, MapPin, Calendar } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";

import useFetch from "@/hooks/useFetch";

type ProfileProps = {
  profile: User;
};

const Profile = ({ profile }: ProfileProps) => {
  const { id } = useAuth();
  const [isFollowing, setIsFollowing] = useState(profile.is_following);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const [likedPosts, setLikedPosts] = useState<Post[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]);

  const debouncedFollow = useDebounce(isFollowing, 1000);

  const handleFollow = () => {
    if (!isFollowing) {
      setIsFollowing(!isFollowing);
    }
  };

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    debouncedFollow
      ? protectedAPI.post(`/users/follow/${profile.id}`)
      : protectedAPI.post(`/users/unfollow/${profile.id}`);
  }, [debouncedFollow]);

  const getLikedPosts = () => {
    const { data } = useFetch(`/posts/user/${profile.id}/liked`);
    setLikedPosts(data);
  };

  const getBookmarkedPosts = () => {
    const { data } = useFetch(`/posts/user/${profile.id}/bookmarked`);
    setBookmarkedPosts(data);
  };

  return profile ? (
    <div className="space-y-8">
      {/* <div className="flex items-center gap-4">
        <span className="cursor-pointer" onClick={() => history.back()}>
          <ArrowLeft className="h-6 w-6" />
        </span>
        <h1 className="text-2xl font-bold">Profile</h1>
      </div> */}
      <FullBleed className="-mt-10">
        <figure className="h-48 w-full overflow-hidden bg-neutral-800">
          <img
            src={profile.cover_picture_url}
            alt=""
            className="object-cover object-center"
          />
        </figure>
      </FullBleed>
      <div className="space-y-3 text-sm font-light">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <ProfilePicture
              img_url={profile.profile_picture_url}
              className="size-16"
            />
            <div>
              <h2 className="text-2xl font-semibold">{profile.name}</h2>
              <p className="tracking-wide text-tertiary-foreground">
                @{profile.username}
              </p>
            </div>
          </div>
          {profile.id === id ? (
            <Link to="/profile/edit" state={{ profile }}>
              <Button variant="outline">Edit Profile</Button>
            </Link>
          ) : !isFollowing ? (
            <Button onClick={handleFollow}>Follow</Button>
          ) : (
            <Dialog>
              <DialogTrigger>
                <Button variant="outline" onClick={handleFollow}>
                  Unfollow
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>Are you sure you want to unfollow?</DialogHeader>
                <DialogFooter>
                  <DialogClose>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    variant="destructive"
                    onClick={() => setIsFollowing(false)}
                  >
                    Unfollow
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <div>
          <p className="text-base font-normal">{profile.bio}</p>
        </div>
        <div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-tertiary-foreground *:flex *:items-center *:gap-1">
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
            <span>{profile.following_count}</span>
            <span className="text-tertiary-foreground"> Following</span>
          </p>
          <p>
            <span>{profile.followers_count}</span>
            <span className="text-tertiary-foreground"> Followers</span>
          </p>
        </div>
      </div>
      <Tabs
        defaultValue="posts"
        className="space-y-8 [&:not(:first-child)]:min-h-screen"
      >
        <FullBleed>
          <TabsList className="w-full rounded-none bg-transparent *:w-full">
            <TabsTrigger
              value="posts"
              className="rounded-none border-b border-neutral-800 data-[state=active]:border-b-2 data-[state=active]:border-white"
            >
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="likes"
              className="rounded-none border-b border-neutral-800 data-[state=active]:border-b-2 data-[state=active]:border-white"
              onClick={getLikedPosts}
            >
              Likes
            </TabsTrigger>
            <TabsTrigger
              value="bookmarks"
              className="rounded-none border-b border-neutral-800 data-[state=active]:border-b-2 data-[state=active]:border-white"
              onClick={getBookmarkedPosts}
            >
              Bookmarks
            </TabsTrigger>
            <TabsTrigger
              value="media"
              className="rounded-none border-b border-neutral-800 data-[state=active]:border-b-2 data-[state=active]:border-white"
            >
              Media
            </TabsTrigger>
          </TabsList>
        </FullBleed>
        <TabsContent value="posts">
          <Posts userId={profile.id} />
        </TabsContent>
        <TabsContent value="likes">
          <div>Replies</div>
        </TabsContent>
        <TabsContent value="bookmarks">
          <div>Likes</div>
        </TabsContent>
        <TabsContent value="media">
          <div>Media</div>
        </TabsContent>
      </Tabs>
    </div>
  ) : (
    <div>Loading...</div>
  );
};
export default Profile;
