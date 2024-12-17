import { router } from "@/App";
import type User from "./user";
import type Post from "./post";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
  interface HistoryState {
    profile?: User;
    post?: Post;
  }
}
