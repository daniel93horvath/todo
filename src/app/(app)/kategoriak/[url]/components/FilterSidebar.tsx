"use client";
import SubCategoryFilter from "./SubCategoryFilter";
import PriceFilter from "./PriceFilter";
import StocksFilter from "./StocksFilter";
import { useProducts } from "../hook"; // Importáld a hookot

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
const FilterSidebar = () => {
	const { products } = useProducts();
	const subCategories = products?.subCategoriesFromProducts || [];
	const prices = products?.prices || { ranges: [], min: 0, max: 0 };
	const stocks = products?.stocks || { full: 0, none: 0 };

	return (
		<>
			<div className="hidden md:block space-y-5">
				{subCategories.length > 0 && (
					<div className="bg-card rounded-lg p-4 border">
						<SubCategoryFilter subCategories={subCategories} />
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
						<Button variant="secondary" className="font-bold">
							Szűrés
						</Button>
					</DrawerTrigger>
					<DrawerContent className="p-2">
						<DrawerHeader>
							<DrawerTitle className="text-secondary">Kategóriák</DrawerTitle>
							<DrawerDescription>Termékek szűrése</DrawerDescription>
						</DrawerHeader>
						<div className="overflow-y-auto space-y-4 p-2">
							<SubCategoryFilter subCategories={subCategories} />
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
