"use client";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { subCategoriesFromProducts } from "../schema";
import FilterLabel from "./FilterLabel";
import { useQueryParams } from "@/lib/helpers/hooks/useQueryParams";
import { usePathname, useRouter } from "next/navigation";

const SubCategoryFilter = ({ subCategories }: { subCategories: subCategoriesFromProducts[] }) => {
	const checkedCategories = useQueryParams().searchParams.getAll("category[]");
	const router = useRouter();
	const pathname = usePathname();
	const updateQueryParam = useQueryParams();

	const handleChecked = (isChecked: boolean, url: string) => {
		if (isChecked) {
			const updatedUrl = updateQueryParam.appendQueryParams({ "category[]": url });
			router.replace(decodeURI(`${pathname}?${updatedUrl.toString()}`));
		} else {
			const updatedUrl = updateQueryParam.removeQueryParamItem("category[]", url);
			router.replace(decodeURI(`${pathname}?${updatedUrl.toString()}`));
		}
	};

	return (
		subCategories.length > 1 && (
			<div className="space-y-3">
				<h5>Kategóriák</h5>
				{subCategories.map((subCategory, index: number) => (
					<div key={index} className="flex items-center space-x-2">
						<Checkbox
							className="w-5 h-5 border shadow-none"
							id={String(subCategory.id)}
							checked={checkedCategories.includes(subCategory.url)}
							onCheckedChange={(value: boolean) => handleChecked(value, subCategory.url)}
						/>
						<FilterLabel htmlFor={String(subCategory.id)} productNumber={subCategory.total}>
							{subCategory.name}
						</FilterLabel>
					</div>
				))}
			</div>
		)
	);
};

export default SubCategoryFilter;

//EZJÓ!
