import { useQuery } from "@tanstack/react-query";
import { ProductsWithCategories } from "./schema";
import { fetchGet } from "@/lib/api/fetch";
import { useParams, usePathname, useSearchParams } from "next/navigation";

export function useProducts() {
	const categoryUrl = useParams();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const isSearchPage = pathname.includes("/search");
	const isWebshopPage = pathname.includes("/webaruhaz");

	let path: string;
	let queryKey: [string, string];

	if (isSearchPage) {
		path = decodeURIComponent(`/api/v3/search/products/list?${searchParams.toString()}`);
		queryKey = ["search", decodeURIComponent(searchParams.toString())];
	} else if (isWebshopPage) {
		path = decodeURIComponent(`/api/v3/shop/products?${searchParams.toString()}`);
		queryKey = ["shop", decodeURIComponent(searchParams.toString())];
	} else {
		path = decodeURIComponent(
			`/api/v3/categories/${categoryUrl.url}/products?${searchParams.toString()}`
		);
		queryKey = ["products", decodeURIComponent(searchParams.toString())];
	}

	const {
		data: products,
		isFetching,
		isError,
	} = useQuery<ProductsWithCategories>({
		queryKey: queryKey,
		queryFn: async () => {
			const response = await fetchGet<ProductsWithCategories>(path);
			if (!response.data) {
				throw new Error("Sikertelen a termékek lekérdezése!");
			}
			return response.data;
		},
		staleTime: 5 * 60 * 1000,
		placeholderData: (previousData) => previousData,
	});

	return { products, isFetching, isError };
}

/**
 * Biztonságosan frissíti az URL-t kliens oldalon anélkül,
 * hogy újrarenderelné az oldalt. Eltávolítja a 'page' query paramétert.
 */
export function updateUrlWithoutReloadPage(url: string): void {
	if (typeof window === "undefined") return;
	// const safeUrl = decodeURIComponent(url.replace("page", "")); // Eredeti kód helyett:
	try {
		// Szétválasztjuk az útvonalat és a query stringet
		const [path, queryString] = url.split("?");
		const params = new URLSearchParams(queryString || ""); // Kezeljük, ha nincs query string

		// Töröljük a 'page' paramétert
		params.delete("page");

		// Összerakjuk az új URL-t
		const newQueryString = params.toString();
		// Csak akkor adjuk hozzá a ?-t, ha maradtak paraméterek
		const safeUrl = decodeURIComponent(path + (newQueryString ? `?${newQueryString}` : ""));

		window.history.replaceState({ as: safeUrl, url: safeUrl }, "", safeUrl);
	} catch (error) {
		// Csendes hiba, nem törjük meg az alkalmazás működését
		console.warn("URL frissítése nem sikerült:", error);
	}
}
