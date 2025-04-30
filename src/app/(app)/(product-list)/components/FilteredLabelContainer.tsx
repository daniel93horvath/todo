"use client";
import React from "react";
import FilteredLabel from "./FilteredLabel";
import { updateUrlWithoutReloadPage, useProducts } from "../hook";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { formatNumber } from "@/lib/helpers/number";
import { FilterSort } from "./Filter/FilterSort";
import { ProductsWithCategories } from "../schema";

const FilteredLabelContainer = () => {
	const { products } = useProducts<ProductsWithCategories>();
	const filters = products?.filters || [];
	const total = products?.total;
	const pathName = usePathname();
	const handleClick = () => {
		updateUrlWithoutReloadPage(`${pathName}`);
	};
	return (
		<div className="flex flex-col sm:flex-row justify-between gap-4 my-4">
			<div className="flex gap-3 flex-wrap items-center">
				{filters.map((filter) => (
					<FilteredLabel key={filter.name} filter={filter} />
				))}
				{filters.length > 0 && (
					<Button variant="outline" className="h-7" onClick={handleClick}>
						Összes törlése
					</Button>
				)}
			</div>
			<div className="min-w-80">
				{total !== undefined && (
					<div className="flex items-center justify-between text-sm">
						<div className="flex">
							<FilterSort />
						</div>
						<div>
							Összesen &nbsp;
							<span className="font-bold">{formatNumber(products?.total || 0)} db</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default FilteredLabelContainer;
