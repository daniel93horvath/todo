"use client";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Category } from "./schema";
import Image from "next/image";
import { DropDownCategory } from "./DropDownCategory";

export function CategoryMenuDesktop({ initialCategories }: { initialCategories: Category[] }) {
	const firstLevelCategories = useMemo(
		() => initialCategories.filter((cat) => cat.level === 1 && cat.visible === 1),
		[initialCategories]
	);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const [activeCategory, setActiveCategory] = useState<number | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		// Csak inicializáláskor állítjuk be az első kategóriát aktívnak
		if (firstLevelCategories.length > 0) {
			//setActiveCategory(firstLevelCategories[0].id); //setIsOpen(true);
		}
		// Tisztítás komponens unmountoláskor
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
		// eslint-disable-next-line
	}, []);

	// Aktív kategória keresése
	const activeSubcategories = activeCategory
		? firstLevelCategories.find((cat) => cat.id === activeCategory)?.children || []
		: [];

	// Aktív kategória objektum
	const activeCategoryObj = firstLevelCategories.find((cat) => cat.id === activeCategory);

	//Azért kell, hogy a bezárásnál nullázzok az addig hoveret kategóriát.
	const handleValueChange = (value: string) => {
		if (value === "") {
			// Törli a meglévő timert, ha van
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			// Új timer beállítása a kategória reseteléshez
			timeoutRef.current = setTimeout(() => {
				setActiveCategory(null);
				timeoutRef.current = null;
			}, 150);

			setIsOpen(false);
		} else {
			setIsOpen(true);
		}
	};

	return (
		<NavigationMenu
			onValueChange={handleValueChange}
			value={isOpen ? "categories" : ""}
			delayDuration={0}
		>
			<NavigationMenuList>
				<NavigationMenuItem value="categories">
					<NavigationMenuTrigger className="bg-secondary pt-0 p-3 h-auto rounded-b-none data-[state=open]:bg-card font-extrabold">
						Kategóriák
					</NavigationMenuTrigger>
					<NavigationMenuContent className="p-0">
						<div className="flex">
							{/* Kategória lista a bal oldalon - kliens és szerver komponensek kombinációja */}
							<DropDownCategory
								categories={firstLevelCategories}
								activeCategory={activeCategory}
								onCategoryHover={setActiveCategory}
							/>

							{/* Alkategóriák - előre renderelt, de kliensoldali megjelenítés */}
							{activeCategory !== null && activeSubcategories.length > 0 && (
								<div className="lg:w-xl md:w-sm border-l p-2 max-h-[500px] overflow-y-auto">
									<SubCategoryColumns category={activeCategoryObj!} />
								</div>
							)}

							{/* Képes promóció, ha van az aktív kategóriának képe */}
							{activeCategory !== null && activeCategoryObj?.image && (
								<div className="w-[250px] h-auto p-2">
									<Image
										src={`https://onlinepenztarca.hu/images/categories/menu/${activeCategoryObj.url}.jpg`}
										alt={`${activeCategoryObj.name} kategória`}
										className="rounded w-full h-full object-cover"
										width={250}
										height={200}
									/>
								</div>
							)}
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const SubCategoryColumns = memo(({ category }: { category: Category }) => {
	return (
		<ul className="columns-3 gap-5 w-full space-y-4 p-2">
			{(category.children || []).map((subcategory) => (
				<li key={subcategory.id} className="space-y-2 ">
					<a href={`/kategoriak/${subcategory.url}`} className="flex gap-2 text-sm m-0">
						{subcategory.icon && (
							<Image
								src={`https://dani.opteszt.hu/images/categories/icons/${subcategory.icon}`}
								alt={subcategory.name}
								width={30}
								height={30}
								className="w-4 h-4"
							/>
						)}
						{subcategory.name}
					</a>

					{/* Harmadik szintű kategóriák */}
					{subcategory.children && subcategory.children.length > 0 && (
						<ul className="[&>li]:hover:bg-muted [&>li]:transition-colors [&>li]:rounded-xs">
							{subcategory.children
								.slice(0, subcategory.child_limit || subcategory.children.length)
								.map((thirdLevel) => (
									<li key={thirdLevel.id}>
										<a
											href={`/kategoriak/${thirdLevel.url}`}
											className="text-[14px] text-muted-foreground font-normal"
										>
											{thirdLevel.name}
										</a>
									</li>
								))}
						</ul>
					)}
				</li>
			))}
		</ul>
	);
});

// Add display name for debugging purposes
SubCategoryColumns.displayName = "SubCategoryColumns";
