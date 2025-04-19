"use client";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchGet } from "@/lib/api/fetch";
import { ProductsWithCategories } from "../schema";
import { StandardApiResponse } from "@/lib/api/schema";

export default function useProductsQuery(categorySlug: string, initialSearch: string) {
	const searchParams = useSearchParams();
	const isClient = typeof window !== "undefined";
	const params = isClient ? searchParams.toString() : initialSearch;

	return useQuery<StandardApiResponse<ProductsWithCategories>>({
		queryKey: ["categoryProducts", categorySlug, params],
		queryFn: () =>
			fetchGet<ProductsWithCategories>(`/api/v3/categories/${categorySlug}/products?${params}`, {
				baseUrl: "https://www.onlinepenztarca.hu",
				cacheOptions: { revalidate: 0 },
			}),
		//keepPreviousData: true,
	});
}
