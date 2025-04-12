import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { subCategoriesFromProducts } from "../schema";

const SubCategoryFilter = ({ subCategories }: { subCategories: subCategoriesFromProducts[] }) => {
	return (
		<div className="space-y-3">
			<h5>Kategóriák</h5>
			{subCategories.map((subCategory, index: number) => (
				<div key={index}>
					<div className="flex items-center space-x-2">
						<Checkbox
							className="w-5 h-5 border border-secondary shadow-none data-[state=checked]:border-secondary"
							id={String(subCategory.id)}
						/>
						<label
							htmlFor={String(subCategory.id)}
							className="leading-5 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							{subCategory.name}{" "}
							<span className="text-xs text-muted-foreground">({subCategory.total})</span>
						</label>
					</div>
				</div>
			))}
		</div>
	);
};

export default SubCategoryFilter;
