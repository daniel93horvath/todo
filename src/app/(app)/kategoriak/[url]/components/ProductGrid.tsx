"use client";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import { Product } from "@/app/product/schema";

export default function ProductGrid({ products }: { products: Product[] }) {
	return (
		<div className="grid h-fit sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{products.map((p) => (
				<ProductCard key={p.elastic_id} product={p} />
			))}
		</div>
	);
}
