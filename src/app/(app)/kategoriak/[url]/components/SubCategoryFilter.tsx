import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { subCategoriesFromProducts } from "../schema";
import FilterLabel from "./FilterLabel";

const SubCategoryFilter = ({ subCategories }: { subCategories: subCategoriesFromProducts[] }) => {
	if (subCategories.length < 1) return;
	return (
		<div className="space-y-3">
			<h5>Kategóriák</h5>
			{subCategories.map((subCategory, index: number) => (
				<div key={index}>
					<div className="flex items-center space-x-2">
						<Checkbox className="w-5 h-5 border shadow-none" id={String(subCategory.id)} />
						<FilterLabel htmlFor={String(subCategory.id)} productNumber={subCategory.total}>
							{subCategory.name}
						</FilterLabel>
					</div>
				</div>
			))}
		</div>
	);
};

export default SubCategoryFilter;
