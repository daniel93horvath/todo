"use client"; // Ha Next.js App Routert használsz

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	// DialogTrigger nincs itt használva, mert manuálisan nyitjuk
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerTitle,
	// DrawerTrigger nincs itt használva, mert manuálisan nyitjuk
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/lib/helpers/hooks/useMediaQuery";
import { SearchIcon } from "lucide-react";
// import { CommandDialog } from "cmdk";

// Példa keresési adatok (ezt lecserélheted API hívásra vagy saját adataidra)
const SEARCH_ITEMS = [
	{ group: "Kategóriák", items: ["Profil", "Számlázás", "Beállítások"] },
	{
		group: "Termék javaslatok",
		items: [
			"Laptop",
			"Okostelefon",
			"Tablet",
			"Fejhallgató",
			"Billentyűzet",
			"Egér",
			"Monitor",
			"Webkamera",
			"Nyomtató",
			"Router",
			"Külső merevlemez",
			"Pendrive",
			"Memóriakártya",
			"Okosóra",
			"Hangszóró",
		],
	},
];

export default function SearchResponsive() {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const handleSelect = (itemName: string) => {
		console.log("Kiválasztva:", itemName); // Itt kezelheted a kiválasztást (pl. navigáció)
		setOpen(false); // Bezárja a keresőt kiválasztás után
	};

	// A Command komponens tartalma, amit mind a Dialog, mind a Drawer használ
	const CommandContent = () => (
		<Command>
			<CommandInput placeholder="Keresés..." />
			<CommandList>
				<CommandEmpty>Nincs találat.</CommandEmpty>
				<div className="grid grid-cols-1 sm:grid-cols-[250px_1fr] min-h-45">
					{/* <div className="grid grid-cols-1 min-h-45"> */}
					<CommandGroup heading="Kategóriák" className="border-r-1">
						{SEARCH_ITEMS[0].items.map((item) => (
							<CommandItem
								key={item}
								value={item} // A szűréshez használt érték
								onSelect={() => handleSelect(item)}
							>
								{/* Itt akár ikont is megjeleníthetsz az elem neve mellett */}
								<span>{item}</span>
							</CommandItem>
						))}
					</CommandGroup>
					<CommandGroup heading="Termékek">
						{SEARCH_ITEMS[1].items.map((item) => (
							<CommandItem
								key={item}
								value={item} // A szűréshez használt érték
								onSelect={() => handleSelect(item)}
							>
								{/* Itt akár ikont is megjeleníthetsz az elem neve mellett */}
								<span>{item}</span>
							</CommandItem>
						))}
					</CommandGroup>
				</div>
			</CommandList>
		</Command>
	);

	if (isDesktop) {
		return (
			<>
				{/* Trigger gomb desktopra */}
				<Button
					variant="outline"
					className="relative border-0 flex w-full justify-between bg-input-background rounded-full h-9 p-2 pl-4 focus-visible:ring-2 focus-visible:ring-ring"
					onClick={() => setOpen(true)}
				>
					<span>Mire szeretnél keresni?</span>
					<div className="bg-primary absolute right-0 top-0 h-full rounded-r-full flex items-center justify-center w-12 cursor-pointer">
						<SearchIcon className="w-4 text-secondary" strokeWidth={3} />
					</div>
				</Button>
				{/* <SearchInput onClick={setOpen} /> */}

				{/* Dialog a Command komponenssel desktopon */}
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTitle className="sr-only">Keresés...</DialogTitle>
					<DialogContent className="overflow-hidden p-0 shadow-lg sm:max-w-2xl">
						<CommandContent />
					</DialogContent>
				</Dialog>
			</>
		);
	}
	// Mobil nézet
	return (
		<>
			{/* Trigger gomb mobilra (pl. egy keresés ikon) */}
			<Button variant="outline" size="icon" onClick={() => setOpen(true)} aria-label="Keresés">
				{/* Helyettesítsd egy keresés ikonnal, pl. Lucide React ikonnal */}
				<SearchIcon />
			</Button>

			{/* Drawer a Command komponenssel mobilon */}
			<Drawer open={open} onOpenChange={() => setOpen(true)}>
				<DrawerContent>
					<DrawerTitle className="sr-only">Keresés...</DrawerTitle>
					{/* Adjunk egy kis paddingot/margót a Drawer tartalmának */}
					<div className="mt-4 border-t p-4">
						<CommandContent />
					</div>
				</DrawerContent>
			</Drawer>
		</>
	);
}
