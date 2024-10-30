//  Custom Hook

import React, { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [url]);

  return { data, error };
};
