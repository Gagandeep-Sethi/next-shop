"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchCache } from "@/provider/redux/searchSlice";
import HomeCardContainer from "./HomeCardContainer";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchData = useSelector((store) => store?.search);
  const dispatch = useDispatch();

  //to get search results
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
    async function getSearchResult() {
      try {
        const response = await fetch(`/api/product/search?query=${query}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const products = await response.json();

        dispatch(searchCache({ [query]: products?.products }));

        setSearched(true);
      } catch (error) {}
    }

    return () => clearTimeout(timer);
  }, [query, searchData, dispatch]);

  // to handle search suggestions
  useEffect(() => {
    if (query.trim() !== "") {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
    async function fetchSuggestions(searchTerm) {
      try {
        const response = await fetch(
          `/api/product/suggestions?query=${searchTerm}`
        );
        const json = await response.json();
        setSuggestions(json.suggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }
  }, [query]);

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-100 pt-12">
      <p className="text-3xl  font-bold mb-6">Search</p>
      <div>
        <div className="flex items-center border bg-white border-gray-300 rounded-lg p-2 m-2">
          <input
            type="text"
            placeholder="Search for something..."
            className="flex-1 outline-none "
            value={query}
            onChange={(e) => {
              setSearched(false);
              setQuery(e.target.value);
            }}
          />
        </div>
        <div className="w-full flex justify-center">
          {suggestions.length > 0 && (
            <ul className=" bg-white border border-gray-200 rounded-xl p-1 shadow-md    w-[96%]">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer rounded-xl transition duration-100 ease-out hover:bg-blue-500 hover:text-white"
                  onClick={() => setQuery(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {searched && results.length === 0 && query.length > 0 && (
        <p className="text-red-500 mt-4">No results found for {query} </p>
      )}
      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl text-center font-semibold mb-4">Results:</h2>

          <div key={results?._id}>
            {/* <CardContainer data={results} /> */}
            <HomeCardContainer data={results} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
