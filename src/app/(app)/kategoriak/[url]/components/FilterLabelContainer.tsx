"use client";
import React from "react";
import FilterLabel from "./FilterLabel";
import { useProducts } from "../hook";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { formatNumber } from "@/lib/helpers/number";

const FilterLabelContainer = () => {
	const { products } = useProducts();
	const filters = products?.filters || [];
	const total = products?.total;
	const pathName = usePathname();
	const handleClick = () => {
		window.history.replaceState(null, "", decodeURI(`${pathName}`));
	};
	return (
		<div className="grid md:grid-cols-[300px_1fr] gap-4">
			<div className="mb-5 md:col-start-2 flex items-center justify-between">
				<div className="flex gap-3 flex-wrap items-center">
					{filters.map((filter) => (
						<FilterLabel key={filter.name} filter={filter} />
					))}
					{filters.length > 0 && (
						<Button variant="ghost" className="h-7" onClick={handleClick}>
							Összes törlése
						</Button>
					)}
				</div>
				{total !== undefined && (
					<div className="text-sm text-right min-w-40">
						Összesen{" "}
						<span className="font-bold">{formatNumber(products?.total || 0)} db</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default FilterLabelContainer;
