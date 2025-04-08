"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ChangeTheme = () => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);
	if (!mounted) {
		return null;
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="link"
					className="hover:no-underline hover:text-primary text-secondary-foreground font-extrabold"
				>
					Megjelenés
					{theme === "light" ? <SunIcon /> : theme === "dark" ? <MoonIcon /> : <SunMoonIcon />}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Megjelenés</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuCheckboxItem
					checked={theme === "light"}
					onCheckedChange={() => setTheme("light")}
				>
					<SunIcon />
					Világos mód
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={theme === "dark"}
					onCheckedChange={() => setTheme("dark")}
				>
					<MoonIcon />
					Sötét mód
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={theme === "system"}
					onCheckedChange={() => setTheme("system")}
				>
					<SunMoonIcon />
					Igazítás a rendszerhez
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ChangeTheme;
