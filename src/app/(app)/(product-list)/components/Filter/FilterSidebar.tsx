"use client";
import SubCategoryFilter from "./SubCategoryFilter";
import PriceFilter from "./PriceFilter";
import StocksFilter from "./StocksFilter";
import { useProducts } from "../../hook"; // Importáld a hookot

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/helpers/number";
import { SlidersHorizontalIcon } from "lucide-react";
import SearchFilter from "./SearchFilter";
import { usePathname } from "next/navigation";
import { ProductsWithCategories } from "../../schema";
const FilterSidebar = () => {
	const { products } = useProducts<ProductsWithCategories>();
	const pathname = usePathname();

	const subCategories = products?.subCategoriesFromProducts || [];
	const prices = products?.prices || { ranges: [], min: 0, max: 0 };
	const stocks = products?.stocks || { full: 0, none: 0 };
	return (
		<>
			<div className="hidden md:block space-y-5 min-w-xs max-w-xs">
				{subCategories.length > 0 && (
					<div className="bg-card rounded-lg p-4 border">
						<SubCategoryFilter subCategories={subCategories} />
					</div>
				)}
				{!pathname.startsWith("/search") && (
					<div className="bg-card rounded-lg p-4 border">
						<SearchFilter categoryName={products?.category?.name} />
					</div>
				)}

				<div className="bg-card rounded-lg p-4 border">
					<PriceFilter prices={prices} />
				</div>
				<div className="bg-card rounded-lg p-4 border">
					<StocksFilter stocks={stocks} />
				</div>
			</div>
			<div className="flex md:hidden fixed bottom-0 left-0 right-0 p-4 z-50 justify-center">
				<Drawer>
					<DrawerTrigger asChild>
						<Button variant="secondary" className="font-bold w-9/12 border shadow-lg">
							<SlidersHorizontalIcon />
							Szűrés
						</Button>
					</DrawerTrigger>
					<DrawerContent className="p-2">
						<DrawerHeader className="border-b-1 pt-1">
							<DrawerTitle className="text-secondary">Szűrés</DrawerTitle>
							<DrawerDescription>Szűrd le az onlinePénztárca termékeit</DrawerDescription>
						</DrawerHeader>
						<div className="overflow-y-auto space-y-4 p-2">
							<SubCategoryFilter subCategories={subCategories} />
							<SearchFilter />
							<PriceFilter prices={prices} />
							<StocksFilter stocks={stocks} />
							<br />
						</div>
						<DrawerClose asChild>
							<Button variant="secondary" className="font-bold mx-8">
								Szűrés ({formatNumber(products?.total || 0)} db)
							</Button>
						</DrawerClose>
					</DrawerContent>
				</Drawer>
			</div>
		</>
	);
};

export default FilterSidebar;
