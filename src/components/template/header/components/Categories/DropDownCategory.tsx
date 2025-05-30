"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import { Category } from "./schema";

export function DropDownCategory({
	categories,
	onCategoryHover = undefined,
	onCategoryClick,
}: {
	categories: Category[];
	onCategoryHover?: (categoryId: Category["id"]) => void;
	onCategoryClick?: () => void;
}) {
	return (
		<ul className="w-full md:w-60">
			{categories.map((category) => (
				<li
					key={category.id}
					className="text-lg md:text-sm flex justify-between font-medium cursor-pointer p-2 hover:bg-accent"
					onMouseEnter={onCategoryHover ? () => onCategoryHover(category.id) : undefined}
					onClick={() => onCategoryClick?.()}
				>
					<span className="flex items-center gap-2">
						{category.icon && (
							<Image
								src={`https://onlinepenztarca.hu/images/categories/icons/${category.url}.svg`}
								alt={category.name}
								width={30}
								height={30}
								className="w-4 h-4"
							/>
						)}
						<Link href={`/kategoriak/${category.url}`}>{category.name}</Link>
					</span>
					{(category.children ?? []).length > 0 && <ChevronRightIcon className="h-4 w-4" />}
				</li>
			))}
		</ul>
	);
}
