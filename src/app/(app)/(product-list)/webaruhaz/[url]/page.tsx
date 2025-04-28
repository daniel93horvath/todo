import { fetchGet } from "@/lib/api/fetch";
import { createURLSearchParams } from "@/lib/helpers/url";
import { PartnerProductsWithCategories } from "../../schema";

import FilterSidebar from "../../components/Filter/FilterSidebar";
import { dehydrate, QueryClient } from "@tanstack/query-core";
import { HydrationBoundary } from "@tanstack/react-query";
import FilteredLabelContainer from "../../components/FilteredLabelContainer";
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

	const url = `${process.env.NEXT_PUBLIC_APP_URL_BACKEND}/shop/${categoryUrl.url}/products?${urlSearchParams}`;
	const queryKey = ["shop", urlSearchParams.toString()];

	await queryClient.prefetchQuery({
		queryKey: queryKey,
		queryFn: async () => {
			const { data = [] } = await fetchGet<PartnerProductsWithCategories>(url);
			return data;
		},
		staleTime: 5 * 60 * 1000,
	});
	// Adat kinyerése a cache-ből a prefetch után
	const prefetchedData = queryClient.getQueryData<PartnerProductsWithCategories>(queryKey);
	const dehydratedState = dehydrate(queryClient);

	return (
		<main>
			<h1>{prefetchedData?.shop?.brand_nev}</h1> <br />
			<HydrationBoundary state={dehydratedState}>
				<FilteredLabelContainer />
				<div className="sm:block md:grid md:grid-cols-[300px_1fr] gap-4">
					<FilterSidebar />
					<SubCategoryBoxes subCategories={prefetchedData?.subCategoryBoxesFromRedis} />
					<ProductList />
				</div>
			</HydrationBoundary>
		</main>
	);
};

export default Page;
