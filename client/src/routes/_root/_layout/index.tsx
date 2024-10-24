import { Feed } from "@/components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/_layout/")({
  component: () => <Home />,
});

function Home() {
  return <Feed />;
}
