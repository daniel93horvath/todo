import React from "react";
import { Prices, Stocks, subCategoriesFromProducts } from "../schema";
import SubCategoryFilter from "./SubCategoryFilter";
//import { Separator } from "@/components/ui/separator";
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
	console.log(prices);
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
		// <aside className="hidden md:block bg-card p-4 rounded-md border">
		// 	{subCategories.length > 0 && (
		// 		<div>
		// 			<SubCategoryFilter subCategories={subCategories} />
		// 			<br />
		// 			<Separator />
		// 			<br />
		// 		</div>
		// 	)}

		// 	<PriceFilter prices={prices} />
		// 	<br />
		// 	<Separator />
		// 	<br />
		// 	<StocksFilter stocks={stocks} />
		// </aside>
	);
};

export default FilterSidebar;
