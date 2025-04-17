"use client";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useTransition } from "react";
import { subCategoriesFromProducts } from "../schema";
import FilterLabel from "./FilterLabel";
import { useQueryParams } from "@/lib/helpers/hooks/useQueryParams";
import { usePathname, useRouter } from "next/navigation";

const SubCategoryFilter = ({ subCategories }: { subCategories: subCategoriesFromProducts[] }) => {
	const router = useRouter();
	const pathname = usePathname();
	const { searchParams, appendQueryParams, removeQueryParamItem } = useQueryParams();
	const checkedCategories = searchParams.getAll("category[]");

	const [isPending, startTransition] = useTransition();

	const handleChecked = (isChecked: boolean, url: string) => {
		const updatedUrl = isChecked
			? appendQueryParams({ "category[]": url })
			: removeQueryParamItem("category[]", url);

		// Optimisztikus navigáció a transition-ben
		startTransition(() => {
			router.replace(`${pathname}?${updatedUrl.toString()}`);
			router.refresh();
		});
	};

	if (subCategories.length <= 1) return null;

	return (
		<div className="space-y-3">
			<h5>Kategóriák</h5>
			{subCategories.map((subCategory) => (
				<div key={subCategory.id} className="flex items-center space-x-2">
					<Checkbox
						className="w-5 h-5 border shadow-none"
						id={String(subCategory.id)}
						checked={checkedCategories.includes(subCategory.url)}
						onCheckedChange={(value: boolean) => handleChecked(value, subCategory.url)}
						disabled={isPending}
					/>
					<FilterLabel htmlFor={String(subCategory.id)} productNumber={subCategory.total}>
						{subCategory.name}
						{isPending && <span className="ml-1 text-sm italic text-gray-500">…</span>}
					</FilterLabel>
				</div>
			))}
		</div>
	);
};

export default SubCategoryFilter;
