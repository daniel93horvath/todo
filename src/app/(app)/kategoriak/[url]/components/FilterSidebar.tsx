"use client";
import { ProductsWithCategories } from "../schema";
import SubCategoryFilter from "./SubCategoryFilter";
import PriceFilter from "./PriceFilter";
import StocksFilter from "./StocksFilter";

export default function FilterSidebar({ data }: { data: ProductsWithCategories }) {
	if (!data) return null;
	return (
		<div className="hidden md:block space-y-5">
			{data.subCategoriesFromProducts.length > 0 && (
				<div className="bg-card rounded-lg p-4 border">
					<SubCategoryFilter subCategories={data.subCategoriesFromProducts} />
				</div>
			)}

			<div className="bg-card rounded-lg p-4 border">
				<PriceFilter prices={data.prices} />
			</div>
			<div className="bg-card rounded-lg p-4 border">
				<StocksFilter stocks={data.stocks} />
			</div>
		</div>
	);
}
