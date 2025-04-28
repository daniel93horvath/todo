"use client";

import ProductCard from "@/components/shared/ProductCard/ProductCard";
import { useProducts } from "../hook"; // Importáld a hookot
import Loading from "../loading";
import OpPagination from "@/components/ui/custom/opPagination";
import { ProductsWithCategories } from "../schema";

export default function ProductList() {
	const { products, isFetching, isError } = useProducts<ProductsWithCategories>();
	if (isFetching) {
		return <Loading />;
	}

	// Hiba állapot vagy nincs termék
	if (isError || !products || !products.products || products.products?.length < 1) {
		return (
			<div className="mx-auto w-full h-fit md:px-5 border p-10 bg-card rounded-lg">
				Nincs a szűrési feltételeknek megfelelő termék.
			</div>
		);
	}

	// Sikeres adatbetöltés után a termékek megjelenítése
	return (
		<div>
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-fit">
				{(products.products || []).map((product) => (
					<ProductCard key={product.elastic_id} product={product} />
				))}
			</div>
			<div className="my-8 text-center">
				<OpPagination scroll itemsPerPage={40} totalItems={products.total} />
			</div>
		</div>
	);
}
