import { QueryClient } from "@tanstack/react-query";

let client: QueryClient | undefined;

export default function getQueryClient() {
	if (!client) {
		client = new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
					retry: 1,
				},
			},
		});
	}
	return client;
}
