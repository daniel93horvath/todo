import { Suspense } from "react";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import { fetchGet } from "@/lib/api/fetch";
import { Product } from "@/app/product/schema";
import { createURLSearchParams } from "@/lib/helpers/url";
import Loading from "./loading";

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
	const url = `/api/v3/categories/${categoryUrl.url}/products?${urlSearchParams}`;

	return (
		<main>
			<Suspense key={categoryUrl.url + urlSearchParams.toString()} fallback={<Loading />}>
				<ProductList url={url} />
			</Suspense>
		</main>
	);
};

async function ProductList({ url }: { url: string }) {
	const { data } = await fetchGet<{
		products: Product[];
		total: number;
	}>(url, {
		baseUrl: "https://www.onlinepenztarca.hu",
		cacheOptions: { revalidate: 0 },
	});

	if (!data || data.products.length < 1) {
		return <div className="mx-auto w-full md:px-5">Nincs terméktalálat</div>;
	}

	return (
		<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{(data.products || []).map((product) => (
				<ProductCard key={product.elastic_id} product={product} />
			))}
		</div>
	);
}
export default Page;
