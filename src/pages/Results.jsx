import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useLocation } from "react-router";
import SearchBar from "../components/SearchBar";

export default function Results() {
  const location = useLocation();
  // console.log(location);
  const query = new URLSearchParams(location.search).get("query");
  const [results, loading, error, getResults] = useFetch();
  const [startIndex, setStartIndex] = useState(1); // For pagination

  const [isLoadingMore, setIsLoadingMore] = useState(false); // Loading state for "Load More"

  useEffect(() => {
    const controller = new AbortController();

    if (query) {
      getResults(query, controller, startIndex);
    }

    return () => {
      console.log("this is a cleanup function");
    };
  }, [query, startIndex, getResults]);

  const loadMoreResults = () => {
    setIsLoadingMore(true); // Set loading state for "Load More"
    setStartIndex((prevIndex) => prevIndex + 10); // Increment startIndex to load the next set of results
  };

  if (loading && startIndex === 1) return <h2>Loading...</h2>; // Show initial loading only on first load

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-[800px] mx-auto">
      <SearchBar defaultQuery={query} />
      {results.length > 0 && (
        <div>
          {results.map((result, index) => (
            <div className="card bg-base-100 w-full shadow-xl" key={index}>
              <div className="card-body">
                <h2 className="card-title text-primary">
                  {result.displayLink}
                </h2>
                <p>{result.snippet}</p>
                <p className="text-green-300">{result.formattedUrl}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {isLoadingMore ? (
        <div className="my-4 text-center">
          <div className="spinner"></div> {/* Spinner */}
          <p>Loading more...</p>
        </div>
      ) : (
        <button
          onClick={loadMoreResults}
          className="mt-4 p-2 bg-blue-500 text-white"
        >
          Load More
        </button>
      )}
    </div>
  );
}
