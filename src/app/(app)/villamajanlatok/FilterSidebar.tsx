import React from "react";
import { subCategoriesFromProducts } from "./schema";

const FilterSidebar = ({ subCategories }: { subCategories: subCategoriesFromProducts[] }) => {
	return (
		<aside className="hidden md:block bg-card p-4 rounded-md border">
			<div>
				<h5>Kategóriák</h5>
				{subCategories.map((subCategory, index: number) => (
					<div key={index}>{subCategory.name}</div>
				))}
			</div>
		</aside>
	);
};

export default FilterSidebar;
