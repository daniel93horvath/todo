import { fetchGet } from "@/lib/api/fetch";
import { createURLSearchParams } from "@/lib/helpers/url";
import { ProductsWithCategories } from "../schema";

import FilterSidebar from "../components/Filter/FilterSidebar";
import { dehydrate, QueryClient } from "@tanstack/query-core";
import { HydrationBoundary } from "@tanstack/react-query";
import FilteredLabelContainer from "../components/FilteredLabelContainer";
import ProductList from "../components/ClientProductList";

const Page = async ({
	searchParams,
}: {
	params: Promise<{ url: string }>;
	searchParams: Promise<{ [key: string]: string | string[] }>;
}) => {
	const urlParams = await searchParams;
	const urlSearchParams = createURLSearchParams(urlParams);
	const queryClient = new QueryClient();

	const url = `${process.env.NEXT_PUBLIC_APP_URL_BACKEND}/search/products/list?${urlSearchParams}`;
	const queryKey = ["search", decodeURIComponent(urlSearchParams.toString())];

	await queryClient.prefetchQuery({
		queryKey: queryKey,
		queryFn: async () => {
			const { data = [] } = await fetchGet<ProductsWithCategories>(url);
			return data;
		},
		staleTime: 5 * 60 * 1000,
	});
	// Adat kinyerése a cache-ből a prefetch után
	const prefetchedData = queryClient.getQueryData<ProductsWithCategories>(queryKey);
	const dehydratedState = dehydrate(queryClient);
	console.log(prefetchedData);
	return (
		<main>
			<h1>Keresés</h1> <br />
			<HydrationBoundary state={dehydratedState}>
				<FilteredLabelContainer />
				<div className="flex gap-4">
					<FilterSidebar />
					<ProductList />
				</div>
			</HydrationBoundary>
		</main>
	);
};

export default Page;
