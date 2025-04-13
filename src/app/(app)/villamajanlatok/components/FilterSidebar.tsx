import React from "react";
import { subCategoriesFromProducts } from "../schema";
import SubCategoryFilter from "./SubCategoryFilter";
import { Separator } from "@/components/ui/separator";
import PriceFilter from "./PriceFilter";

const FilterSidebar = ({ subCategories }: { subCategories: subCategoriesFromProducts[] }) => {
	return (
		<aside className="hidden md:block bg-card p-4 rounded-md space-y-3 border">
			<SubCategoryFilter subCategories={subCategories} />
			<br />
			<Separator />
			<PriceFilter />
			<br />
			<Separator />
		</aside>
	);
};

export default FilterSidebar;
