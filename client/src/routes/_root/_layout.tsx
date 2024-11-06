import { createFileRoute } from "@tanstack/react-router";

import { Main, Sidebar, RightSidebar, Toaster } from "@/components";
import protectedAPI from "@/lib/axios/auth";

import store from "@/state/store";
import { setProfile } from "@/state/reducers/profile";

import { toast } from "sonner";

export const Route = createFileRoute("/_root/_layout")({
  beforeLoad: async () => {
    try {
      const res = await protectedAPI.get("/auth/me");
      const { id, username } = res.data;
      store.dispatch(setProfile({ id, username }));
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
      <div className="*:p-6 sm:grid sm:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_2fr_1fr]">
        <Sidebar />
        <Main />
        <RightSidebar />
      </div>
    </>
  );
}
