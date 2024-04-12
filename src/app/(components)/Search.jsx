"use client";
import React, { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/product/search?query=${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const products = await response.json();
      console.log(products);
      setResults(products.products);
      setSearched(true);
    } catch (error) {
      setError("No products found");
    }
  };

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-100 pt-12">
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      <div className="flex items-center border border-gray-300 rounded-lg p-2">
        <input
          type="text"
          placeholder="Search for something..."
          className="flex-1 outline-none bg-gray-100"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {searched && results.length === 0 && query.length > 0 && (
        <p className="text-red-500 mt-4">No results found for {query} </p>
      )}
      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Results:</h2>
          <ul>
            {results.map((result, index) => (
              // <li key={index} className="border-b border-gray-300 py-2">
              //   {result}
              // </li>
              <li key={index}>product found</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
