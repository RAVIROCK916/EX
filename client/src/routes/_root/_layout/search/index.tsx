import Search from "@/components/main/Search";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/_layout/search/")({
  component: SearchPage,
});

function SearchPage() {
  return (
    <div className="space-y-6 p-8">
      <h1 className="text-3xl font-bold">Search Page</h1>
      <Search />
    </div>
  );
}
