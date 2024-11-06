import { router } from "@/App";
import type User from "./user";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
  interface HistoryState {
    profile: User;
  }
}
