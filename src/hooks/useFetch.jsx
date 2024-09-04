import axios from "axios";
import { useState } from "react";

export default function useFetch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API = `AIzaSyBEoCyppL1Xh14KcYNjun28lnOS_Dffvx0`;
  //   const searchTerm = "react js";
  const searchID = `11454f98fc92844c5`;

  const getResults = async (query) => {
    const BASE_URL = `https://www.googleapis.com/customsearch/v1?key=${API}&q=${query}&num=5&cx=${searchID}`;
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get(BASE_URL);
      console.log(response.data.items);
      setResults(response.data.items || []);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return [results, loading, error, getResults];
}
