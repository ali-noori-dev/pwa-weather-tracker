import { AxiosError } from "axios";
import { ApiErrorResponse, ApiState } from "types";

export const initialState = <T>() => ({
  data: null as T | null,
  loading: false,
  error: null as string | null,
});

export const handleApiError = <T>(
  error: unknown,
  setState: (newState: ApiState<T>) => void
) => {
  const err = error as AxiosError<ApiErrorResponse>;

  setState({
    ...initialState(),
    error:
      err.response?.data?.message || "Request failed. Please try again later.",
  });
};
