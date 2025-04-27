// --- useSearch.ts ----------------------------------------------------
import { useDebounce } from "@/lib/helpers/hooks/useDebounce";
import { useFetch } from "@/lib/helpers/hooks/useFetch";
import { EMPTY_SEARCH_CATEGORIES } from "./emptySearch";
import { SearchResults } from "./Schema";

const EMPTY_RESULTS: SearchResults = {
	categories: EMPTY_SEARCH_CATEGORIES,
	products: [],
};

export function useSearch(term: string) {
	const debounced = useDebounce(term, 300);

	// csak ha nem üres a kereső kifejezés, építünk URL-t
	const url = debounced.trim()
		? `/api/v3/search/products/suggestions?query=${encodeURIComponent(debounced)}`
		: null;

	// initialData: EMPTY_RESULTS, automatikus fetch URL-váltásnál
	const { data, loading } = useFetch<SearchResults>(
		url,
		{}, // alap fetchOptions
		{ initialData: EMPTY_RESULTS }
	);

	// ha üres a debounced, garantáltan üres eredmény
	const results = debounced.trim() ? data ?? EMPTY_RESULTS : EMPTY_RESULTS;

	return { loading, results };
}
