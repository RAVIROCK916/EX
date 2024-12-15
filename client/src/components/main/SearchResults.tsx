import User from "@/types/user";

import { Loader } from "@/components";

import { ArrowUpLeft } from "@phosphor-icons/react";
import { router } from "@/App";

type Props = {
  loading: Boolean;
  data: User[];
};

const SearchResults = ({ loading, data }: Props) => {
  return (
    <div className="absolute left-0 right-0 top-full rounded-b-md border border-t-0 border-neutral-800 bg-neutral-950">
      {loading ? (
        <div className="flex items-center justify-center py-3">
          <Loader />
        </div>
      ) : data.length > 0 ? (
        data.map((user: User) => (
          <div
            key={user.id}
            className="flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-neutral-900"
            onClick={() => {
              router.navigate({ to: `/user/${user.username}` });
            }}
          >
            <p>@{user.username}</p>
            {/* <Button size="sm" onMouseDown={() => handleClick(user)}>
											Follow
											</Button> */}
            <ArrowUpLeft />
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center py-3">
          No results found
        </div>
      )}
    </div>
  );
};

export default SearchResults;
