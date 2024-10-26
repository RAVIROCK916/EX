import { Main, Sidebar } from "@/components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/_layout")({
  component: () => (
    <div className="grid grid-cols-[1fr_2fr_1fr] *:p-6">
      <Sidebar />
      <Main />
    </div>
  ),
});
