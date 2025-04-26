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
		<Command shouldFilter={false} className="max-h-125">
			<CommandInput
				className="text-base md:text-sm"
				autoFocus
				placeholder="Keresés…"
				value={query}
				onValueChange={setQuery}
			/>
			<CommandList className="flex-1 overflow-y-auto md:min-h-95">
				{loading && <LoadingSkeleton />}
				{!loading && !hasResults && query && <CommandEmpty>Nincs találat.</CommandEmpty>}

				<div
					className={`grid ${
						results.products.length > 0 &&
						results.categories.length > 0 &&
						"md:grid-cols-[250px_1fr]"
					}`}
				>
					{results.categories.length > 0 && (
						<CommandGroup
							heading="Kategóriák"
							className={`${
								results.products.length > 0 ? "border-r-1 h-100" : ""
							} order-2 md:order-1`}
						>
							{results.categories.map((category) => (
								<SearchResultItem
									key={category.url}
									{...category}
									total={category.total}
									url={`/kategoriak/${category.url}`}
									type="category"
									image={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/images/categories/images/${category.image}`} //INNEN FOLYTATOM
									onClose={() => setOpen(false)}
								/>
							))}
						</CommandGroup>
					)}
					{results.products.length > 0 && (
						<CommandGroup heading="Termékek" className="order-1 md:order-2">
							{results.products.map((product) => (
								<SearchResultItem
									type="product"
									key={product.url}
									{...product}
									onClose={() => setOpen(false)}
								/>
							))}
						</CommandGroup>
					)}
				</div>
			</CommandList>
		</Command>
	);

	return (
		<>
			<Button
				variant="outline"
				size={isDesktop ? "default" : "icon"}
				className="relative h-9 w-full justify-between rounded-full bg-input-background pl-4 text-left border-0"
				onClick={() => setOpen(true)}
			>
				<span className="truncate text-muted-foreground">{"Mire szeretnél keresni?"}</span>
				<div className="absolute right-0 top-0 flex h-full w-12 items-center justify-center rounded-r-full bg-primary">
					<SearchIcon className="w-4" strokeWidth={3} />
				</div>
			</Button>

			{isDesktop ? (
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogContent
						className="overflow-hidden p-0 md:max-w-2xl lg:max-w-3xl shadow-xl"
						aria-describedby={undefined}
					>
						<DialogTitle className="sr-only">Találatok</DialogTitle>
						{renderResults}
					</DialogContent>
				</Dialog>
			) : (
				<Drawer open={open} onOpenChange={setOpen} repositionInputs>
					<DrawerTitle className="sr-only">Találatok</DrawerTitle>
					<DrawerContent
						className="fixed inset-0 h-[100dvh] flex flex-col overflow-y-auto"
						aria-describedby={undefined}
					>
						{renderResults}
					</DrawerContent>
				</Drawer>
			)}
		</>
	);
}
