"use client";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import SkeletonGrid from "./SkeletonGrid";
import useProductsQuery from "../hooks/useProductsQuery";

export default function ProductsSection({
	categorySlug,
	initialSearch,
}: {
	categorySlug: string;
	initialSearch: string;
}) {
	const { data, isLoading, isFetching } = useProductsQuery(categorySlug, initialSearch);
	const loading = isLoading || isFetching;
	const success = data?.success;
	const payload = data?.data;

	if (!success || !payload?.products.length) {
		return (
			<div className="mx-auto w-full md:px-5 border p-10 bg-card rounded-lg">
				Nincs terméktalálat
			</div>
		);
	}

	return (
		<div className="grid md:grid-cols-[300px_1fr] gap-4">
			<FilterSidebar data={payload} />
			{loading ? <SkeletonGrid /> : <ProductGrid products={payload.products} />}
		</div>
	);
}
