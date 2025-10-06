import { useEffect, useMemo, useState } from "react";
import rawReviewData from "../data/reviews.json";

const REVIEW_ENDPOINT = "https://api.myfreestocks.com/reviews";

export default function useReviewData() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        // TODO: Replace mock data with live API request
        // const response = await fetch(REVIEW_ENDPOINT);
        // const payload = await response.json();
        const payload = rawReviewData;

        if (isMounted) {
          setData(Array.isArray(payload) ? payload : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err
              : new Error("Unable to load review data")
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      data,
      isLoading,
      error,
      // TODO: expose refetch when API integration is live
      endpoint: REVIEW_ENDPOINT,
    }),
    [data, error, isLoading]
  );

  return value;
}
