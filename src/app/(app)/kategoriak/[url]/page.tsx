import { fetchGet } from "@/lib/api/fetch";
import { createURLSearchParams } from "@/lib/helpers/url";
import { ProductsWithCategories } from "./schema";
import ProductList from "./components/ClientProductList";
import FilterSidebar from "./components/Filter/FilterSidebar";
import { dehydrate, QueryClient } from "@tanstack/query-core";
import { HydrationBoundary } from "@tanstack/react-query";
import FilteredLabelContainer from "./components/FilteredLabelContainer";

const Page = async ({
	params,
	searchParams,
}: {
	params: Promise<{ url: string }>;
	searchParams: Promise<{ [key: string]: string | string[] }>;
}) => {
	const categoryUrl = await params;
	const urlParams = await searchParams;
	const urlSearchParams = createURLSearchParams(urlParams);
	const url = `${process.env.NEXT_PUBLIC_APP_URL_BACKEND}/categories/${categoryUrl.url}/products?${urlSearchParams}`;
	const queryClient = new QueryClient();
	const queryKey = ["products", urlSearchParams.toString()];

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
	return (
		<main>
			<h1>{prefetchedData?.category?.name}</h1> <br />
			<HydrationBoundary state={dehydratedState}>
				<FilteredLabelContainer />
				<div className="grid md:grid-cols-[300px_1fr] gap-4">
					<FilterSidebar />
					<ProductList />
				</div>
			</HydrationBoundary>
		</main>
	);
};

export default Page;
