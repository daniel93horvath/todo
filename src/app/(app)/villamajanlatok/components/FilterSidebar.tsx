import React from "react";
import { subCategoriesFromProducts } from "../schema";
import SubCategoryFilter from "./SubCategoryFilter";
import { Separator } from "@/components/ui/separator";

const FilterSidebar = ({ subCategories }: { subCategories: subCategoriesFromProducts[] }) => {
	return (
		<aside className="hidden md:block bg-card p-4 rounded-md border">
			<SubCategoryFilter subCategories={subCategories} />
			<br />
			<Separator />
		</aside>
	);
};

export default FilterSidebar;
