import axios from "axios";

import { useEffect, useRef, useState } from "react";

import { Input } from "@/components";
import { SERVER_URL } from "@/constants";

import useDebounce from "@/hooks/useDebounce";
import User from "@/types/user";
import SearchResults from "./SearchResults";

const Search = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const searchRef = useRef(null);

  const debouncedSearch = useDebounce(search);

  const fetchUsers = async () => {
    setIsLoading(true);

    const res = await axios.get(`${SERVER_URL}/users`, {
      params: {
        search: debouncedSearch,
      },
    });

    setIsLoading(false);
    setResults(res.data);
  };

  useEffect(() => {
    if (debouncedSearch) {
      fetchUsers();
    } else {
      setResults([]);
    }
  }, [debouncedSearch]);

  return (
    <div
      className="relative"
      ref={searchRef}
      onFocus={() => setShowResults(true)}
      onBlur={() => {
        setTimeout(() => setShowResults(false), 100);
      }}
    >
      <Input
        placeholder="Search..."
        className={`h-auto w-full px-4 py-2 text-base focus-visible:border-neutral-800 ${
          showResults && results.length > 0 && "rounded-b-none"
        }`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {showResults && <SearchResults loading={loading} data={results} />}
    </div>
  );
};

export default Search;
