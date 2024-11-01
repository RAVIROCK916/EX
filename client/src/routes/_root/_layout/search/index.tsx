import Search from "@/components/main/Search";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/_layout/search/")({
  component: SearchPage,
});

function SearchPage() {
  return (
    <div>
      <Search />
    </div>
  );
}
