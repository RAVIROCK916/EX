import axios from "axios";

import { useEffect, useRef, useState } from "react";

import { Input } from "@/components";
import { SERVER_URL } from "@/constants";

import useDebounce from "@/hooks/useDebounce";
import User from "@/types/user";
import SearchResults from "./SearchResults";
import { MagnifyingGlass } from "phosphor-react";

const Search = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const searchRef = useRef(null);

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      fetchUsers();
    } else {
      setResults([]);
    }
  }, [debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);

    const value = e.target.value;
    setSearch(value);

    value.trim() ? setShowResults(true) : setShowResults(false);
  };

  const handleFocus = () => {
    search.trim() ? setShowResults(true) : setShowResults(false);
  };

  const handleBlur = () => {
    setTimeout(() => setShowResults(false), 200);
  };

  const fetchUsers = async () => {
    const res = await axios.get(`${SERVER_URL}/users`, {
      params: {
        search: debouncedSearch.trim(),
      },
    });

    setResults(res.data);
    setIsLoading(false);
  };

  return (
    <div
      className="relative"
      ref={searchRef}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <Input
        placeholder="Search..."
        className={`h-auto w-full px-4 py-2 text-base focus-visible:border-neutral-800 ${
          search.trim() && showResults && "rounded-b-none"
        }`}
        value={search}
        onChange={(e) => handleChange(e)}
      />
      <MagnifyingGlass className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-neutral-500" />
      {showResults && <SearchResults loading={loading} data={results} />}
    </div>
  );
};

export default Search;
