import { useState, useEffect } from "react";
import Post from "@/types/post";
import { agoTime, cachingDecorator } from "@/utils";
import { ProfilePicture } from "../global/ProfilePicture";
import {
  BookmarkSimple,
  ChatCircle,
  Heart,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import useDebounce from "@/hooks/useDebounce";
import protectedAPI from "@/lib/axios/auth";
import { Link, useLocation } from "@tanstack/react-router";

import Loader from "../global/Loader";

import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../ui/hover-card";

import User from "@/types/user";
import { Button } from "../ui/button";
import fetchData from "@/utils/fetchData";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { cn } from "@/utils/cn";
import { useNavigate } from "@tanstack/react-router";
import { Skeleton } from "../ui/skeleton";

type Props = {
  post: Post;
};

const cachedFetch = cachingDecorator(fetchData);

const PostCard = ({ post }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [liked, setLiked] = useState<boolean | undefined>(post.liked_by_user);
  const [bookmarked, setBookmarked] = useState<boolean | undefined>(
    post.bookmarked_by_user,
  );
  const [isFollowing, setIsFollowing] = useState<Boolean | null>(null);

  const [imageLoading, setImageLoading] = useState(true);

  const navigate = useNavigate();

  const currentUser = useSelector((state: RootState) => state.profile);

  const debouncedLiked = useDebounce(liked, 1000);
  const debouncedBookmarked = useDebounce(bookmarked, 1000);
  const debouncedFollow = useDebounce(isFollowing, 1000);

  const { pathname } = useLocation();
  const isPostPage = pathname === `/post/${post.id}`;

  const {
    name,
    username,
    caption,
    image_url,
    profile_picture_url,
    no_of_likes,
    no_of_comments,
    created_at,
  } = post;

  const [likes_count, setLikesCount] = useState(no_of_likes);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    debouncedLiked
      ? protectedAPI.post(`/posts/${post.id}/like`)
      : protectedAPI.post(`/posts/${post.id}/unlike`);
  }, [debouncedLiked]);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    debouncedBookmarked
      ? protectedAPI.post(`/posts/${post.id}/bookmark`)
      : protectedAPI.post(`/posts/${post.id}/unbookmark`);
  }, [debouncedBookmarked]);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    debouncedFollow
      ? protectedAPI.post(`/users/follow/${user?.id}`)
      : protectedAPI.post(`/users/unfollow/${user?.id}`);
  }, [debouncedFollow]);

  const handleFetchProfile = async () => {
    const data = await cachedFetch(`users/${username}/profile`);
    setUser(data);
  };

  const handleFollow = () => {
    if (debouncedFollow === null) {
      setIsFollowing(!user?.is_following);
    } else {
      setIsFollowing(!isFollowing);
    }
  };

  const handleLike = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikesCount(() => (liked ? likes_count - 1 : likes_count + 1));
  };

  const handleBookmark = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    setBookmarked(!bookmarked);
  };

  return (
    <div className="space-y-5 transition-colors">
      <div className="flex gap-x-2">
        <figure className="size-10 overflow-hidden rounded-full">
          <ProfilePicture img_url={profile_picture_url} alt={name} />
        </figure>
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="space-y-px">
                <HoverCard>
                  <HoverCardTrigger asChild onMouseEnter={handleFetchProfile}>
                    <Link
                      to={`/user/${username}`}
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="link"
                        className="h-max w-max cursor-pointer p-0 text-base text-neutral-200 transition-colors hover:text-neutral-100"
                      >
                        {name}
                      </Button>
                      <span className="text-sm text-neutral-500">
                        @{username}
                      </span>
                    </Link>
                  </HoverCardTrigger>
                  <HoverCardContent
                    align="start"
                    className="w-80 border-neutral-600 bg-neutral-950"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {user ? (
                      <div>
                        <div className="space-y-2">
                          <ProfilePicture
                            img_url={user.profile_picture_url}
                            alt={user.name}
                            className="size-16"
                          />
                          <div className="flex justify-between">
                            <div>
                              <div>{user.name}</div>
                              <span className="text-sm text-neutral-500">
                                @{user.username}
                              </span>
                            </div>
                            <div>
                              {user.id !== currentUser.id && (
                                <Button
                                  variant={
                                    isFollowing === null
                                      ? user.is_following
                                        ? "outline"
                                        : "default"
                                      : isFollowing
                                        ? "outline"
                                        : "default"
                                  }
                                  className="rounded-full"
                                  onClick={handleFollow}
                                >
                                  {isFollowing === null
                                    ? user.is_following
                                      ? "Unfollow"
                                      : "Follow"
                                    : isFollowing
                                      ? "Unfollow"
                                      : "Follow"}
                                </Button>
                              )}
                            </div>
                          </div>
                          <div>
                            <span className="text-neutral-500">{user.bio}</span>
                          </div>
                          <div className="flex gap-2 text-xs text-neutral-500">
                            <div>{user.followers_count} Followers</div>
                            <div>{user.following_count} Following</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Loader />
                      </div>
                    )}
                  </HoverCardContent>
                </HoverCard>
                <div className="text-xs text-neutral-600">
                  {agoTime(created_at)}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <p
                className={cn(
                  !isPostPage && "cursor-pointer",
                  "text-sm sm:text-base md:text-lg",
                )}
                onClick={() => {
                  if (isPostPage) return;
                  navigate({ to: `/post/${post.id}`, state: { post } });
                }}
              >
                {caption}
              </p>
              {image_url && (
                <figure className="max-h-[600px] cursor-pointer overflow-hidden rounded-xl border border-borderGray">
                  {imageLoading && <Skeleton className="h-64 w-full" />}

                  <img
                    src={image_url}
                    alt={caption}
                    className={`w-full object-center transition-opacity hover:opacity-90 ${imageLoading ? "hidden" : "block"}`}
                    onLoad={() => setImageLoading(false)}
                  />
                </figure>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between text-sm *:w-12 *:text-textGray">
            <div>
              <div
                className={cn(
                  "flex w-max items-center gap-2 transition-colors hover:text-pink-500",
                  liked && "text-pink-700",
                )}
              >
                <Heart
                  className="size-6 cursor-pointer"
                  weight={liked ? "fill" : undefined}
                  onClick={handleLike}
                />
                <p className="select-none">{likes_count}</p>
              </div>
            </div>
            <div>
              <div className="flex w-max items-center gap-2 transition-colors hover:text-blue-400">
                <ChatCircle
                  className="size-6 cursor-pointer"
                  onClick={() =>
                    navigate({ to: `/post/${post.id}`, state: { post } })
                  }
                />
                <p className="select-none">{no_of_comments}</p>
              </div>
            </div>
            <div>
              <div className="w-max">
                <BookmarkSimple
                  className={cn(
                    "size-6 cursor-pointer transition-colors hover:text-yellow-300",
                    bookmarked && "text-yellow-500",
                  )}
                  weight={bookmarked ? "fill" : undefined}
                  onClick={handleBookmark}
                />
              </div>
            </div>
            <div>
              <div className="w-max transition-colors hover:text-green-500">
                <PaperPlaneTilt className="size-6 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
