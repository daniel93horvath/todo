"use client";
import React from "react";
import FilteredLabel from "./FilteredLabel";
import { updateUrlWithoutReloadPage, useProducts } from "../hook";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { formatNumber } from "@/lib/helpers/number";

const FilteredLabelContainer = () => {
	const { products } = useProducts();
	const filters = products?.filters || [];
	const total = products?.total;
	const pathName = usePathname();
	const handleClick = () => {
		updateUrlWithoutReloadPage(`${pathName}`);
	};
	return (
		<div className="grid md:grid-cols-[300px_1fr] gap-4">
			<div className="mb-3 md:col-start-2 items-center justify-between">
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
				{total !== undefined && (
					<div className="text-sm text-right min-w-40">
						Összesen &nbsp;
						<span className="font-bold">{formatNumber(products?.total || 0)} db</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default FilteredLabelContainer;
