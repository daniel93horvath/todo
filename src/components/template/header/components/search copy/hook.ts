// --- useSearch.ts ----------------------------------------------------
import { useEffect, useState } from "react";
import { useDebounce } from "@/lib/helpers/hooks/useDebounce";
import { fetchGet } from "@/lib/api/fetch";
import { EMPTY_SEARCH_CATEGORIES } from "./emptySearch";
import { SearchResults } from "./Schema";

const EMPTY_RESULTS: SearchResults = {
	categories: EMPTY_SEARCH_CATEGORIES,
	products: [],
};

export function useSearch(term: string) {
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState<SearchResults>(EMPTY_RESULTS);
	const debounced = useDebounce(term, 300);

	useEffect(() => {
		if (!debounced.trim()) {
			setResults(EMPTY_RESULTS);
			return;
		}

		const controller = new AbortController();
		(async () => {
			setLoading(true);
			try {
				const { data } = await fetchGet<SearchResults>(
					`/api/v3/products/search?query=${encodeURIComponent(debounced)}`
					// { signal: controller.signal }
				);
				console.log(data);
				setResults(data ?? EMPTY_RESULTS);
			} catch {
				// fetch aborted or failed – keep previous state
			} finally {
				setLoading(false);
			}
		})();

		return () => controller.abort();
	}, [debounced]);

	return { loading, results };
}
