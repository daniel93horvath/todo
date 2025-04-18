import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import React from "react";
import { UserCircle2 } from "lucide-react";
import LoginContent from "../../LoginContent";

const LoginDrawer = ({ children }: { children?: React.ReactNode }) => {
	return (
		<Drawer>
			<DrawerTrigger>
				<UserCircle2 strokeWidth={1.5} className="text-accent" />
			</DrawerTrigger>
			<DrawerContent className="p-2">
				<DrawerHeader>
					<DrawerTitle className="text-secondary">Bejelentkezés</DrawerTitle>
					<DrawerDescription>Jelentkezz be onlinePénztárcádba</DrawerDescription>
				</DrawerHeader>
				<div className="overflow-y-auto p-2">
					<LoginContent />
					{children}
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default LoginDrawer;
