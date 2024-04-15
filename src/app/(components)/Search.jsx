"use client";
import React, { useEffect, useState } from "react";
import CardContainer from "./CardContainer";
import { useDispatch, useSelector } from "react-redux";
import { searchCache } from "@/provider/redux/searchSlice";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const searchData = useSelector((store) => store?.search);
  const dispatch = useDispatch();

  console.log(results, "results");
  console.log(query, "query");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchData[query]) {
        if (searchData[query].length === 0) {
          setResults([]);
          setSearched(true);
        }
        setResults(searchData[query]);
      } else {
        getSearchResult();
      }
    }, 200);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, searchData]);

  const getSearchResult = async () => {
    try {
      const response = await fetch(`/api/product/search?query=${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const products = await response.json();

      dispatch(searchCache({ [query]: products?.products }));

      setSearched(true);
    } catch (error) {}
  };
  console.log(results, "rsults");

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-100 pt-12">
      <p className="text-3xl  font-bold mb-6">Search</p>
      <div className="flex items-center border border-gray-300 rounded-lg p-2">
        <input
          type="text"
          placeholder="Search for something..."
          className="flex-1 outline-none bg-gray-100"
          value={query}
          onChange={(e) => {
            setSearched(false);
            setQuery(e.target.value);
          }}
        />
        {/* <button
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button> */}
      </div>
      {searched && results.length === 0 && query.length > 0 && (
        <p className="text-red-500 mt-4">No results found for {query} </p>
      )}
      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl text-center font-semibold mb-4">Results:</h2>

          <div key={results?._id}>
            <CardContainer data={results} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
