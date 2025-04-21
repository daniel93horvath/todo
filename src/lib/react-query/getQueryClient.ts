import { cache } from "react";
import { QueryClient } from "@tanstack/react-query";

// Create a cached query client for server-side rendering
export const getQueryClient = cache(
	() =>
		new QueryClient({
			defaultOptions: {
				queries: {
					// Disable refetching on window focus to reduce unnecessary network requests
					refetchOnWindowFocus: false,
					// Allow stale data to be shown while refetching
					staleTime: 5 * 60 * 1000, // 5 minutes
				},
			},
		})
);
