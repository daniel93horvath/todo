"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ListFilterIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { updateUrlWithoutReloadPage } from "../../hook";

export function FilterSort() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const currentSort = searchParams.get("sort") || "relevance";
	const handleSelect = (value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("sort", value);
		updateUrlWithoutReloadPage(`${pathname}?${params.toString()}`);
	};
	return (
		<Select defaultValue={currentSort} onValueChange={handleSelect}>
			<SelectTrigger className="w-fit !text-foreground !p-2 !min-h-2 !h-2 !border-0 shadow-none !bg-transparent">
				<ListFilterIcon className="!w-3 !h-3" />
				<SelectValue placeholder="Sorrend" />
			</SelectTrigger>
			<SelectContent className="bg-card">
				<SelectGroup>
					<SelectLabel>Sorrend</SelectLabel>
					<SelectItem value="relevance">Népszerűség</SelectItem>
					<SelectItem value="price-asc">Ár szerint növekvő</SelectItem>
					<SelectItem value="price-desc">Ár szerint csökkenő</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
