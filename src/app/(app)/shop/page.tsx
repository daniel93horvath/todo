import ProductCard from "@/components/shared/ProductCard/ProductCard";
import React from "react";

const ShopPage = () => {
	const product = {
		id: 1,
		name: "Vászonkép 5 darabos, Mandala 100x60 cm",
	};
	return (
		<div>
			<ProductCard product={product} />
		</div>
	);
};

export default ShopPage;
