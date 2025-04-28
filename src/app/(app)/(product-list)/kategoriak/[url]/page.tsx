import { fetchGet } from "@/lib/api/fetch";
import { createURLSearchParams } from "@/lib/helpers/url";
import { ProductsWithCategories } from "../../schema";

import FilterSidebar from "../../components/Filter/FilterSidebar";
import { dehydrate, QueryClient } from "@tanstack/query-core";
import { HydrationBoundary } from "@tanstack/react-query";
import FilteredLabelContainer from "../../components/FilteredLabelContainer";
import { CategoryDescription } from "../../components/CategoryDescription";
import SubCategoryBoxes from "../../components/mobile/SubCategoryBoxes";
import ProductList from "../../components/ClientProductList";

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
	const queryClient = new QueryClient();

	const url = `${process.env.NEXT_PUBLIC_APP_URL_BACKEND}/categories/${categoryUrl.url}/products?${urlSearchParams}`;
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
				<SubCategoryBoxes subCategories={prefetchedData?.subCategoryBoxesFromRedis} />
				<div className="flex gap-4">
					<FilterSidebar />
					<div className="w-full">
						<ProductList />
						<CategoryDescription
							description={prefetchedData?.category?.description ?? undefined}
						/>
					</div>
				</div>
			</HydrationBoundary>
		</main>
	);
};

export default Page;
