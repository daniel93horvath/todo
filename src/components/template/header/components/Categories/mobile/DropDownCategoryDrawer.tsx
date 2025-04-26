"use client";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

import React, { useState } from "react";
import { DropDownCategory } from "../DropDownCategory";
import { Category } from "../schema";
import { MenuIcon } from "lucide-react";

const DropDownCategoryDrawer = ({ categories }: { categories: Category[] }) => {
	const [open, setOpen] = useState(false);
	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger>
				<MenuIcon className="text-accent" />
			</DrawerTrigger>
			<DrawerContent className="p-2">
				<DrawerHeader>
					<DrawerTitle className="text-secondary">Kategóriák</DrawerTitle>
					<DrawerDescription>Böngéssz kategóriáink között</DrawerDescription>
				</DrawerHeader>
				<div className="overflow-y-auto p-2">
					<DropDownCategory categories={categories} onCategoryClick={() => setOpen(false)} />
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default DropDownCategoryDrawer;
