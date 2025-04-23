"use client";
import Image from "next/image";
import { memo } from "react";

import { DropDownCategoryProps } from "./schema";
import { ChevronRightIcon } from "lucide-react";

export const DropDownCategory = memo(
	({ categories, activeCategory, onCategoryHover, isMobile = false }: DropDownCategoryProps) => {
		return (
			<div className={isMobile ? "w-full" : "lg:w-60 md:w-55"}>
				<ul>
					{categories.map((category) => (
						<li
							key={category.id}
							className={`
                            text-sm flex justify-between font-medium cursor-pointer p-2
                            ${
								!isMobile && activeCategory === category.id
									? "bg-accent text-foreground"
									: ""
							}`}
							onMouseEnter={() => !isMobile && onCategoryHover?.(category.id)}
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
								<a href={`/kategoriak/${category.url}`}>{category.name}</a>
							</span>
							{(category.children?.length || 0) > 0 && (
								<ChevronRightIcon className="h-4 w-4" />
							)}
						</li>
					))}
				</ul>
			</div>
		);
	}
);

DropDownCategory.displayName = "DropDownCategory";
