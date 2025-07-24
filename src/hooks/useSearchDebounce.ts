import { useEffect } from "react";

const useSearchDebounce = <T>(
  keyword: string,
  searchAPI: (data: string) => Promise<T | T[]>
) => {
  useEffect(() => {
    const delayDebounceTimer = setTimeout(async () => {
      try {
        await searchAPI(keyword);
      } catch (error) {
        console.error("Error during search API call:", error);
      }
    }, 500);

    return () => clearTimeout(delayDebounceTimer);
  }, [keyword, searchAPI]);
};

export default useSearchDebounce;
