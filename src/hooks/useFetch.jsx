import axios from "axios";
import { useState } from "react";

export default function useFetch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API = `AIzaSyDL3zfCEnc0t9dEb_XKT1Xsvxn6lm_U6hU`;
  //   const searchTerm = "react js";
  const searchID = `11454f98fc92844c5`;

  const getResults = async (query, start = 1) => {
    const BASE_URL = `https://www.googleapis.com/customsearch/v1?key=${API}&q=${query}&num=5&cx=${searchID}`;
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get(BASE_URL);
      if (start === 1) {
        setResults(response.data.items || []);
      } else {
        setResults((prev) => [...prev, ...(response.data.items || [])]);
      }
      console.log(response.data);
      console.log(response.data.items);
    } catch (err) {
      console.log(err);
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return [results, loading, error, getResults];
}
