import { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useLocation } from "react-router";
import SearchBar from "../components/SearchBar";

export default function Results() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [isLoading, setIsLoading] = useState(false); // for load more data
  const [startIndex, setStartIndex] = useState(1);
  const [results, loading, error, getResults] = useFetch();
  const loadMoreRef = useRef(null);

  useEffect(() => {
    getResults(query, startIndex);
    setIsLoading(false);
    return () => {
      console.log("api is cleaned up...");
    };
  }, [query, startIndex]);

  const loadMoreResults = () => {
    setIsLoading(true);
    setStartIndex((index) => index + 10);
  };

  useEffect(() => {
    if (!loading && loadMoreRef.current) {
      loadMoreRef.current.scrollIntoView({ behavior: "smooth" });
      setIsLoading(false);
    }
  }, [loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
      <div ref={loadMoreRef}></div>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <button className="btn" onClick={loadMoreResults}>
          Load More
        </button>
      )}
    </div>
  );
}
