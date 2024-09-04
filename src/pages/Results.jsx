import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useLocation } from "react-router";
import SearchBar from "../components/SearchBar";

export default function Results() {
  const location = useLocation();
  console.log(location);
  const query = new URLSearchParams(location.search).get("query");
  const [results, loading, error, getResults] = useFetch();

  useEffect(() => {
    getResults(query);
  }, []);

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
    </div>
  );
}
