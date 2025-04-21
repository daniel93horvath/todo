"use client";
import SubCategoryFilter from "./SubCategoryFilter";
import PriceFilter from "./PriceFilter";
import StocksFilter from "./StocksFilter";
import { useProducts } from "../hook"; // Importáld a hookot
const FilterSidebar = () => {
	const { products } = useProducts();
	const subCategories = products?.subCategoriesFromProducts || [];
	const prices = products?.prices || { ranges: [], min: 0, max: 0 };
	const stocks = products?.stocks || { full: 0, none: 0 };

	return (
		<div className="hidden md:block space-y-5">
			{subCategories.length > 0 && (
				<div className="bg-card rounded-lg p-4 border">
					<SubCategoryFilter subCategories={subCategories} />
				</div>
			)}

			<div className="bg-card rounded-lg p-4 border">
				<PriceFilter prices={prices} />
			</div>
			<div className="bg-card rounded-lg p-4 border">
				<StocksFilter stocks={stocks} />
			</div>
		</div>
	);
};

export default FilterSidebar;
