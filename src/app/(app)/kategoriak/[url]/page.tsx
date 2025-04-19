import { createURLSearchParams } from "@/lib/helpers/url";
import { fetchGet } from "@/lib/api/fetch";
import { StandardApiResponse } from "@/lib/api/schema";
import { ProductsWithCategories } from "./schema";
import { dehydrate } from "@tanstack/query-core";
import ProductsSection from "./components/ProductsSection";
import getQueryClient from "@/lib/react-query/getQueryClient";
import HydrateClient from "@/lib/react-query/HydrateClient";
import { Suspense } from "react";

export default async function Page({
	params,
	searchParams,
}: {
	// Definiáld a típusokat közvetlenül itt
	params: Promise<{ url: string }>;
	searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
	const { url } = await params;
	const search = createURLSearchParams(await searchParams).toString();
	const apiUrl = `/api/v3/categories/${url}/products?${search}`;

	const queryClient = getQueryClient();

	await queryClient.prefetchQuery<StandardApiResponse<ProductsWithCategories>>({
		queryKey: ["categoryProducts", url, search],
		queryFn: () =>
			fetchGet<ProductsWithCategories>(apiUrl, {
				baseUrl: "https://www.onlinepenztarca.hu",
				cacheOptions: { revalidate: 0 },
			}),
	});

	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrateClient state={dehydratedState}>
			<Suspense fallback={null}>
				<ProductsSection categorySlug={url} initialSearch={search} />
			</Suspense>
		</HydrateClient>
	);
}
