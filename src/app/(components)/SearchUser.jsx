import React, { useState } from "react";
import UserOrders from "./UserOrders";

const SearchUser = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    const response = await fetch(`/api/users/search?query=${searchQuery}`);
    const json = await response.json();
    console.log(json?.users, "user json");
    setSearchResults(json?.users);
    setSearched(true);
    console.log(searchResults, "search");
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchResults("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="max-w-md w-full px-4 py-8 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Search User</h1>
        <div className="flex items-center border-b border-gray-200">
          <input
            type="text"
            className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            placeholder="Enter email of user..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearched(false);
            }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 ml-2 rounded"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 ml-2 rounded"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
      {searchResults ? (
        <div>
          <p>{searchResults?.username}</p>
          <p>{searchResults?.email}</p>
          <p>{searchResults?.phoneNumber}</p>
          <div className="w-full">
            <UserOrders email={searchResults?.email} />
          </div>
        </div>
      ) : (
        <p className="mt-4 text-center text-gray-500">
          {searched && !searchResults && searchQuery.length > 0 && (
            <p className="text-red-500 mt-4">
              No user found with this email: {searchQuery}{" "}
            </p>
          )}
        </p>
      )}
    </div>
  );
};

export default SearchUser;
