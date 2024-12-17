import { createFileRoute } from "@tanstack/react-router";

import { Main, LeftSidebar, RightSidebar, Toaster } from "@/components";
import protectedAPI from "@/lib/axios/auth";

import store from "@/state/store";
import { setProfile } from "@/state/reducers/profile";

import { toast } from "sonner";

export const Route = createFileRoute("/_root/_layout")({
  beforeLoad: async () => {
    try {
      const res = await protectedAPI.get("/auth/me");
      const { id, username, profile_picture_url } = res.data;
      store.dispatch(setProfile({ id, username, profile_picture_url }));
    } catch (error) {
      toast.error("Not logged in");
      // window.location.href = "/login";
    }
  },
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <Toaster richColors theme="dark" position="top-right" />
      <div className="sm:grid sm:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_2fr_1fr]">
        <LeftSidebar />
        <Main />
        <RightSidebar />
      </div>
    </>
  );
}
