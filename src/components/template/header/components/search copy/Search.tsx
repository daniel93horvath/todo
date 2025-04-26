"use client";
import { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from "@/components/ui/command";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { useMediaQuery } from "@/lib/helpers/hooks/useMediaQuery";
import { useSearch } from "./hook";
import SearchResultItem from "./SearchResultItem";
import LoadingSkeleton from "./LoadingSkeleton";

export default function Search() {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const { loading, results } = useSearch(query);

	const hasResults = Boolean(results.categories.length || results.products.length);

	const renderResults = (
		<Command shouldFilter={false} className="flex max-h-125 flex-col">
			<CommandInput autoFocus placeholder="Keresés…" value={query} onValueChange={setQuery} />
			<CommandList className="flex-1 overflow-y-auto min-h-95">
				{loading && <LoadingSkeleton />}
				{!loading && !hasResults && query && <CommandEmpty>Nincs találat.</CommandEmpty>}

				{results.products.length > 0 && (
					<CommandGroup heading="Termékek">
						{results.products.map((product) => (
							<SearchResultItem
								key={product.url}
								{...product}
								onClose={() => setOpen(false)}
							/>
						))}
					</CommandGroup>
				)}

				{results.categories.length > 0 && (
					<CommandGroup heading="Kategóriák">
						{results.categories.map((category) => (
							<SearchResultItem
								key={category.url}
								{...category}
								image={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/images/categories/images/${category.image}`} //INNEN FOLYTATOM
								onClose={() => setOpen(false)}
							/>
						))}
					</CommandGroup>
				)}
			</CommandList>
		</Command>
	);

	return (
		<>
			<Button
				variant="outline"
				size={isDesktop ? "default" : "icon"}
				className="relative h-9 w-full justify-between rounded-full bg-input-background pl-4 text-left"
				onClick={() => setOpen(true)}
			>
				<span className="truncate text-muted-foreground">
					{query || "Mire szeretnél keresni?"}
				</span>
				<div className="absolute right-0 top-0 flex h-full w-12 items-center justify-center rounded-r-full bg-primary">
					<SearchIcon className="w-4" strokeWidth={3} />
				</div>
			</Button>

			{isDesktop ? (
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogContent className="overflow-hidden p-0 sm:max-w-2xl shadow-xl">
						<DialogTitle className="sr-only">Találatok</DialogTitle>
						{renderResults}
					</DialogContent>
				</Dialog>
			) : (
				<Drawer open={open} onOpenChange={setOpen}>
					<DrawerTitle className="sr-only">Találatok</DrawerTitle>
					<DrawerContent>{renderResults}</DrawerContent>
				</Drawer>
			)}
		</>
	);
}
