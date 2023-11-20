import { useEffect, useState } from "react";

const fetchData = async (path: string) => {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };
  
const useFetchData = (endpoints: string[]) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        Promise.all(
        endpoints.map((endpoint) =>
            fetchData(endpoint).then((content) => ({ [endpoint]: content }))
        )
        )
        .then((results) => {
        setData(results.reduce((acc, current) => ({ ...acc, ...current }), {}));
        })
        .catch((error) => {
        setError(error);
        });
    }, []); // Pass an empty array to only run on mount

    return [data, error];
};

export { useFetchData, fetchData }