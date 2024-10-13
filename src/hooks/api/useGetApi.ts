import { useEffect, useState } from "react";
import { ApiState } from "../../types";
import { handleApiError, initialState } from "./apiStateUtils";

interface UseGetApiArgs<T, P> {
  apiMethod: (...args: P[]) => Promise<T>;
  params: P[];
  enabled?: boolean;
}

const useGetApi = <T, P = unknown>({
  apiMethod,
  params,
  enabled = true,
}: UseGetApiArgs<T, P>) => {
  const [state, setState] = useState<ApiState<T>>(initialState<T>());

  useEffect(() => {
    const fetchData = async () => {
      setState({ ...initialState(), loading: true });
      try {
        const data = await apiMethod(...params);
        setState({ ...initialState(), data });
      } catch (error) {
        handleApiError(error, setState);
      }
    };

    if (enabled) fetchData();
  }, [
    ...params, // Re-fetch when params change
    enabled,
  ]);

  return state;
};

export default useGetApi;
