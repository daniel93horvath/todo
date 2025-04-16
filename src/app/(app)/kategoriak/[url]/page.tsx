import ProductCard from "@/components/shared/ProductCard/ProductCard";
import { fetchGet } from "@/lib/api/fetch";
import { Product } from "@/app/product/schema";
import { Suspense } from "react";

const Page = async ({
	params,
	searchParams,
}: {
	params: Promise<{ url: string }>;
	searchParams: Promise<{ [key: string]: string | string[] }>;
}) => {
	const categoryUrl = await params;
	const urlParams = await searchParams;

	//console.log(createURLSearchParams(urlParams).toString());
	const hasProductFilter = "product-filter" in urlParams;
	const endpoint = hasProductFilter
		? "/product-list/filter?pagecategory=hutok-es-fagyasztok&category[]=hutogep-alkatresztartozek"
		: `/categories/dinamic/${categoryUrl.url}`;

	const { data } = await fetchGet<{
		products: Product[];
		total: number;
	}>(endpoint, {
		baseUrl: "https://www.onlinepenztarca.hu",
		cacheOptions: { revalidate: 3600 },
	});

	// Alapértelmezett üres tömb, ha nincs data vagy products
	if (!data) {
		return <div className="mx-auto w-full md:px-5">Nincs terméktalálat</div>;
	}
	const products = data.products || [];
	return (
		<main>
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{products.map((product) => (
					<Suspense key={product.elastic_id} fallback="Töltés">
						<ProductCard key={product.elastic_id} product={product} />
					</Suspense>
				))}
			</div>
		</main>
	);
};

export default Page;
