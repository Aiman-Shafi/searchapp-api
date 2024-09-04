import { useEffect, useState } from "react";
import serachMe from "../assets/search-me.png";
import { useLocation, useNavigate } from "react-router";

// eslint-disable-next-line react/prop-types
export default function SearchBar({ defaultQuery }) {
  const [searchTerm, setSearchTerm] = useState(defaultQuery || "");
  const [showImage, setShowImage] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/results?query=${encodeURIComponent(searchTerm)}`);
    }
  }

  useEffect(() => {
    if (location.pathname === "/results") {
      setShowImage(false);
    }
  }, [location.pathname]);

  return (
    <div className="mx-auto text-center">
      <div className="flex justify-center flex-col items-center">
        {showImage && (
          <img src={serachMe} alt="search me icon" className="w-[300px]" />
        )}
        <h2 className="text-white font-semibold text-3xl py-5">
          Are you looking for something?
        </h2>
      </div>
      <form className="max-w-[600px] mx-auto" onSubmit={handleSubmit}>
        <label className="input input-bordered input-primary flex items-center gap-2 ">
          <input
            type="text"
            className="grow text-white"
            placeholder="Search 🔎"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </form>
    </div>
  );
}
