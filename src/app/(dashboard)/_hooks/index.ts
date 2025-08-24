// React Query Hooks
export * from "./use-appointments";
export * from "./use-patients";
export * from "./use-query-utils";
export * from "./use-user";

// Re-export React Query core for convenience
export {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  useQueries,
} from "@tanstack/react-query";
