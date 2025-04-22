import { useQuery } from "@tanstack/react-query";
import { ProductsWithCategories } from "./schema";
import { fetchGet } from "@/lib/api/fetch";
import { useParams, useSearchParams } from "next/navigation";
// Ha TanStack Query v5+-t használsz, importáld a keepPreviousData-t
// import { keepPreviousData } from "@tanstack/react-query";

export function useProducts() {
	// Adj típust a useParams-nak
	const params = useParams<{ url: string }>();
	const searchParams = useSearchParams();
	// Külön változók a kulcshoz
	const categoryUrlParam = params?.url;
	const searchParamsString = searchParams.toString();

	// Építsd fel a path-t csak akkor, ha van categoryUrlParam
	const path = categoryUrlParam
		? `/api/v3/categories/${categoryUrlParam}/products?${searchParamsString}`
		: null;

	const {
		data: products,
		isFetching,
		isError,
	} = useQuery<ProductsWithCategories>({
		// Használj strukturáltabb queryKey-t
		queryKey: ["products", categoryUrlParam, searchParamsString],
		queryFn: async () => {
			// Ellenőrizd, hogy a path érvényes-e a fetch előtt
			if (!path) {
				// Vagy dobj hibát, vagy adj vissza egy alapértelmezett állapotot
				throw new Error("Kategória URL hiányzik a lekérdezéshez.");
			}
			const response = await fetchGet<ProductsWithCategories>(path, {
				baseUrl: "https://www.onlinepenztarca.hu",
			});
			if (!response.data) {
				throw new Error("Sikertelen a termékek lekérdezése!");
			}
			return response.data;
		},
		// Csak akkor engedélyezd a lekérdezést, ha a categoryUrlParam létezik
		enabled: !!categoryUrlParam,
		staleTime: 5 * 60 * 1000,
		// TanStack Query v5+ esetén használd a keepPreviousData-t
		// placeholderData: keepPreviousData,
		// Vagy tartsd meg a v4 szintaxist, ha azt használod
		placeholderData: (previousData) => previousData,
	});

	return { products, isFetching, isError };
}
