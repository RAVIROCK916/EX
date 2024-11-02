import { Main, Sidebar } from "@/components";
import RightSidebar from "@/components/main/RightSidebar";
import { Toaster } from "@/components/ui/sonner";
import protectedAPI from "@/lib/axios/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/_layout")({
  beforeLoad: async () => {
    try {
      await protectedAPI.get("/auth/me");
    } catch (error) {
      // window.location.href = "/login";
    }
  },
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <Toaster richColors theme="dark" position="top-right" />
      <div className="grid grid-cols-[1fr_2fr_1fr] *:p-6">
        <Sidebar />
        <Main />
        <RightSidebar />
      </div>
    </>
  );
}
