import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

import React from "react";
import { DropDownCategory } from "../DropDownCategory";
import { Category } from "../schema";
import { MenuIcon } from "lucide-react";

const DropDownCategoryDrawer = ({ categories }: { categories: Category[] }) => {
	return (
		<Drawer>
			<DrawerTrigger>
				<MenuIcon className="text-accent" />
			</DrawerTrigger>
			<DrawerContent className="p-2">
				<DrawerHeader>
					<DrawerTitle className="text-secondary">Kategóriák</DrawerTitle>
					<DrawerDescription>Böngéssz kategóriáink között</DrawerDescription>
				</DrawerHeader>
				<div className="overflow-y-auto p-2">
					<DropDownCategory categories={categories} />
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default DropDownCategoryDrawer;
