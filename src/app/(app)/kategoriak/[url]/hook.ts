import { useQuery } from "@tanstack/react-query";
import { ProductsWithCategories } from "./schema";
import { fetchGet } from "@/lib/api/fetch";
import { useParams, useSearchParams } from "next/navigation";

export function useProducts() {
	const categoryUrl = useParams(); // Kategória URL lekérdezése
	const searchParams = useSearchParams();
	const path = decodeURI(`/api/v3/categories/${categoryUrl.url}/products?${searchParams.toString()}`);
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
