"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { subCategoriesFromProducts } from "../../schema";
import FilterLabel from "./FilterSidebarLabel";
import { useQueryParams } from "@/lib/helpers/hooks/useQueryParams";
import { usePathname } from "next/navigation";
import { updateUrlWithoutReloadPage } from "../../hook";

const SubCategoryFilter = ({ subCategories }: { subCategories: subCategoriesFromProducts[] }) => {
	const pathname = usePathname();
	// Hívjuk meg a hook-ot csak egyszer
	const { searchParams, appendQueryParams, removeQueryParamItem } = useQueryParams();
	const checkedCategories = searchParams.getAll("category[]");
	const handleChecked = (isChecked: boolean, url: string) => {
		const updatedUrl = isChecked
			? appendQueryParams({ "category[]": url })
			: removeQueryParamItem("category[]", url);
		updateUrlWithoutReloadPage(`${pathname}?${updatedUrl.toString()}`);
	};

	// Csak akkor rendereljük, ha több alkategória van
	if (subCategories.length <= 1) {
		return null;
	}

	return (
		<div className="space-y-3">
			<h5>Kategóriák</h5>
			{subCategories.map((subCategory) => (
				// Használjunk stabil kulcsot, mint az id
				<div key={subCategory.id} className="flex items-center space-x-2">
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
	);
};

export default SubCategoryFilter;
