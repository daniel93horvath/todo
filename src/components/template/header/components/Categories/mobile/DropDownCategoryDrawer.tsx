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
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Kategóriák</DrawerTitle>
					<DrawerDescription>Böngéssz kategóriáink között</DrawerDescription>
				</DrawerHeader>
				<div className="overflow-y-auto">
					<DropDownCategory categories={categories} />
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default DropDownCategoryDrawer;
