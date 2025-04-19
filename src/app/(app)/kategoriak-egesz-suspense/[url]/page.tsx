import { Suspense } from "react";
import Loading from "./loading";
import { fetchGet } from "@/lib/api/fetch";
import { createURLSearchParams } from "@/lib/helpers/url";
import FilterSidebar from "./components/FilterSidebar";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import { ProductsWithCategories } from "./schema";
import { Product } from "@/app/product/schema";
import { StandardApiResponse } from "@/lib/api/schema";
interface CategoryPageProps {
	params: Promise<{
		url: string;
	}>;
	searchParams: Promise<{
		[key: string]: string | string[] | undefined;
	}>;
}
export default async function Page(props: CategoryPageProps) {
	const [{ url: categorySlug }, urlParams] = await Promise.all([props.params, props.searchParams]);
	const apiUrl = `/api/v3/categories/${categorySlug}/products?${createURLSearchParams(urlParams)}`;

	// azonnal indítjuk, Promise‑ként adjuk tovább
	const dataPromise = fetchGet<ProductsWithCategories>(apiUrl, {
		baseUrl: "https://www.onlinepenztarca.hu",
		cacheOptions: { revalidate: 0 },
	});

	return (
		<Suspense key={categorySlug + JSON.stringify(urlParams)} fallback={<Loading />}>
			<ProductList filterPromise={dataPromise} />
		</Suspense>
	);
}

async function ProductList({
	filterPromise,
}: {
	filterPromise: Promise<StandardApiResponse<ProductsWithCategories>>;
}) {
	const { success, data } = await filterPromise;
	if (!success || !data?.products.length) {
		return (
			<div className="mx-auto w-full md:px-5 border p-10 bg-card rounded-lg">
				Nincs terméktalálat
			</div>
		);
	}
	return (
		<>
			<div className="grid md:grid-cols-[300px_1fr] gap-4">
				<FilterSidebar data={data} />
				<div className="grid h-fit sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{data.products.map((p: Product) => (
						<ProductCard key={p.elastic_id} product={p} />
					))}
				</div>
			</div>
		</>
	);
}
