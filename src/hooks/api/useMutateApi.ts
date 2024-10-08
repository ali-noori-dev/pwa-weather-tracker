import { AxiosError } from "axios";
import { useState } from "react";
import { ApiErrorResponse, ApiState } from "../../types";
import { handleApiError, initialState } from "./apiStateUtils";

interface UseMutateApiArgs<T, P> {
  apiMethod: (...args: P[]) => Promise<T>;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSuccess?: (data: T) => void;
  onSettled?: () => void;
}

const useMutateApi = <T, P = unknown>({
  apiMethod,
  onError,
  onSuccess,
  onSettled,
}: UseMutateApiArgs<T, P>) => {
  const [state, setState] = useState<ApiState<T>>(initialState<T>());

  const triggerApiCall = async (...params: P[]) => {
    setState({ ...initialState(), loading: true });
    try {
      const data = await apiMethod(...params);
      setState({ ...initialState(), data });
      if (onSuccess) onSuccess(data);
    } catch (error) {
      handleApiError(error, setState);
      if (onError) onError(error as AxiosError<ApiErrorResponse>);
    } finally {
      if (onSettled) onSettled();
    }
  };

  return { ...state, triggerApiCall };
};

export default useMutateApi;
