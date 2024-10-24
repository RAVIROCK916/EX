import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/_layout/user/$username")({
  component: Username,
});

function Username() {
  const { username } = Route.useParams();

  return <div>{username}</div>;
}
