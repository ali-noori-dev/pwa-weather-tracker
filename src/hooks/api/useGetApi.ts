import { useEffect, useMemo, useState } from "react";
import { ApiState } from "../../types";
import { handleApiError, initialState } from "./apiStateUtils";

interface UseGetApiArgs<T, P> {
  apiMethod: (...args: P[]) => Promise<T>;
  params: P[];
}

const useGetApi = <T, P = unknown>({
  apiMethod,
  params,
}: UseGetApiArgs<T, P>) => {
  const [state, setState] = useState<ApiState<T>>(initialState<T>());

  // Memoize params to avoid re-running useEffect on every render.
  const memoizedParams = useMemo(() => params, [params]);

  useEffect(() => {
    const fetchData = async () => {
      setState({ ...initialState(), loading: true });
      try {
        const data = await apiMethod(...memoizedParams);
        setState({ ...initialState(), data });
      } catch (error) {
        handleApiError(error, setState);
      }
    };
    fetchData();
  }, [apiMethod, memoizedParams]); // Re-fetch when params change

  return state;
};

export default useGetApi;
