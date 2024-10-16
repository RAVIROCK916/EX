import { Feed, Sidebar } from "@/components";

import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(root)/")({
  component: () => (
    <div className="grid grid-cols-[1fr_2fr_1fr] p-6">
      <Sidebar />
      <Feed />
    </div>
  ),
});
