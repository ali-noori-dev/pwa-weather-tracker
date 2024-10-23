import { useEffect, useState } from "react";
import { ApiState } from "../../types";
import { handleApiError, initialState } from "./apiStateUtils";

interface UseGetApiArgs<T, P, R = T> {
  apiMethod: (...args: P[]) => Promise<T>;
  params: P[];
  enabled?: boolean;
  transform?: (data: T) => R;
}

const useGetApi = <T, P = unknown, R = T>({
  apiMethod,
  params,
  enabled = true,
  transform,
}: UseGetApiArgs<T, P, R>) => {
  const [state, setState] = useState<ApiState<R>>(initialState<R>());

  useEffect(() => {
    const fetchData = async () => {
      setState({ ...initialState(), loading: true });
      try {
        const data: T = await apiMethod(...params);

        const transformedData = transform
          ? transform(data)
          : (data as unknown as R);

        setState({ ...initialState(), data: transformedData });
      } catch (error) {
        handleApiError(error, setState);
      }
    };

    if (enabled) fetchData();
  }, [
    ...params, // Re-fetch when params change
    enabled,
  ]);

  const reset = () => {
    setState(initialState());
  };

  return { ...state, reset };
};

export default useGetApi;
