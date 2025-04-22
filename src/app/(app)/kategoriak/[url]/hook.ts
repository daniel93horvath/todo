import { useQuery } from "@tanstack/react-query";
import { ProductsWithCategories } from "./schema";
import { fetchGet } from "@/lib/api/fetch";
import { useParams, useSearchParams } from "next/navigation";

export function useProducts() {
	const categoryUrl = useParams(); // Kategória URL lekérdezése
	const searchParams = useSearchParams();
	const path = `/api/v3/categories/${categoryUrl.url}/products?${searchParams.toString()}`;
	const {
		data: products,
		isFetching,
		isError,
	} = useQuery<ProductsWithCategories>({
		queryKey: ["products", path],
		queryFn: async () => {
			const response = await fetchGet<ProductsWithCategories>(path, {
				baseUrl: "https://www.onlinepenztarca.hu",
			});
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
 * hogy újrarenderelné az oldalt
 */
export function updateUrlWithoutReloadPage(url: string): void {
	console.log("UPDATE URL WITHOUT RELOAD PAGE");
	if (typeof window === "undefined") return;

	try {
		window.history.replaceState({ as: url, url: url }, "", url);
	} catch (error) {
		// Csendes hiba, nem törjük meg az alkalmazás működését
		console.warn("URL frissítése nem sikerült:", error);
	}
}
