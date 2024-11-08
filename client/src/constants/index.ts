import {
  Bell,
  Bookmark,
  ImagePlus,
  Mail,
  Search,
  TvMinimal,
  UserRound,
} from "lucide-react";

export const SERVER_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

export const sidebarLinks = [
  {
    label: "Feed",
    icon: TvMinimal,
    href: "/",
  },
  {
    label: "Search",
    icon: Search,
    href: "/search",
  },
  {
    label: "Notifications",
    icon: Bell,
    href: "/notifications",
  },
  {
    label: "Messages",
    icon: Mail,
    href: "/messages",
  },
  {
    label: "Bookmarks",
    icon: Bookmark,
    href: "/bookmarks",
  },
  {
    label: "Create Post",
    icon: ImagePlus,
    href: "/post/create",
  },
  {
    label: "Profile",
    icon: UserRound,
    href: "/profile",
  },
];
