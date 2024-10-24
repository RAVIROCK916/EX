import User from "@/types/user";

import { Button, Loader } from "@/components";
import { useSelector } from "react-redux";

import { RootState } from "@/state/store";
import { handleAuth } from "@/utils/auth/handleAuth";
import { ArrowUpLeft } from "phosphor-react";
import { router } from "@/App";

type Props = {
  loading: Boolean;
  data: User[];
};

const SearchResults = ({ loading, data }: Props) => {
  const token = useSelector((state: RootState) => state.auth.token);

  const handleClick = (user: User) => {
    handleAuth("POST", "/users/follow", { userId: user.id }, token);
  };

  return (
    <div className="rounded-b-md border border-t-0 border-neutral-800">
      {loading ? (
        <div className="flex items-center justify-center py-3">
          <Loader />
        </div>
      ) : data.length > 0 ? (
        data.map((user: User) => (
          <div
            key={user.id}
            className="flex cursor-pointer items-center justify-between rounded-md px-4 py-2 hover:bg-neutral-900"
          >
            <p
              onClick={() => {
                router.navigate({ to: `/user/${user.username}` });
              }}
            >
              @{user.username}
            </p>
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
