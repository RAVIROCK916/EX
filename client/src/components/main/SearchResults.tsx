import User from "@/types/user";

import { Button, Loader } from "@/components";
import { useSelector } from "react-redux";

import { RootState } from "@/state/store";
import { handleAuth } from "@/utils/auth/handleAuth";

type Props = {
  loading: Boolean;
  data: User[];
};

const SearchResults = ({ loading, data }: Props) => {
  const token = useSelector((state: RootState) => state.auth.token);

  const handleClick = (user: User) => {
    handleAuth("POST", "/users/follow", { following_user: user.id }, token);
  };

  return (
    <>
      {data.length > 0 && (
        <div className="rounded-b-md border border-t-0 border-neutral-800 p-1">
          {loading ? (
            <div className="flex items-center justify-center py-3">
              <Loader />
            </div>
          ) : (
            data.map((user: User) => (
              <div
                key={user.id}
                className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 hover:bg-neutral-900"
              >
                <p>{user.username}</p>
                <Button size="sm" onMouseDown={() => handleClick(user)}>
                  Follow
                </Button>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default SearchResults;
