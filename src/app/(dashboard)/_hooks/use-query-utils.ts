import { useQueryClient } from "@tanstack/react-query";

// Utility hook for common query operations
export const useQueryUtils = () => {
  const queryClient = useQueryClient();

  const invalidateQueries = (queryKeys: readonly (readonly string[])[]) => {
    queryKeys.forEach((key) => {
      queryClient.invalidateQueries({ queryKey: key });
    });
  };

  const removeQueries = (queryKeys: string[][]) => {
    queryKeys.forEach((key) => {
      queryClient.removeQueries({ queryKey: key });
    });
  };

  const setQueryData = <T>(queryKey: string[], data: T) => {
    queryClient.setQueryData(queryKey, data);
  };

  const getQueryData = <T>(queryKey: string[]): T | undefined => {
    return queryClient.getQueryData(queryKey);
  };

  const prefetchQuery = async <T>(
    queryKey: string[],
    queryFn: () => Promise<T>
  ) => {
    await queryClient.prefetchQuery({
      queryKey,
      queryFn,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const clearCache = () => {
    queryClient.clear();
  };

  return {
    invalidateQueries,
    removeQueries,
    setQueryData,
    getQueryData,
    prefetchQuery,
    clearCache,
  };
};

// Common query keys for consistency
export const queryKeys = {
  appointments: ["appointments"] as const,
  appointment: (id: string) => ["appointments", id] as const,
  patients: ["patients"] as const,
  patient: (id: string) => ["patients", id] as const,
  user: ["user"] as const,
  settings: ["settings"] as const,
  stats: ["stats"] as const,
  services: ["services"] as const,
  service: (id: string) => ["services", id] as const,
} as const;

// Error handling utility
export const handleQueryError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unexpected error occurred";
};

// Loading states utility
export const getLoadingState = (
  isLoading: boolean,
  isFetching: boolean,
  isError: boolean
) => {
  if (isError) return "error";
  if (isLoading) return "loading";
  if (isFetching) return "refetching";
  return "idle";
};
