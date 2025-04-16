import React from "react";
import { Prices, Stocks, subCategoriesFromProducts } from "../schema";
import SubCategoryFilter from "./SubCategoryFilter";
import PriceFilter from "./PriceFilter";
import StocksFilter from "./StocksFilter";

const FilterSidebar = ({
	subCategories,
	prices,
	stocks,
}: {
	subCategories: subCategoriesFromProducts[];
	prices: Prices;
	stocks: Stocks;
}) => {
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
