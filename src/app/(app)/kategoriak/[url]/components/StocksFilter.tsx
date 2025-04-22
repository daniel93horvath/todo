"use client";
import { Stocks } from "../schema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FilterLabel from "./FilterSidebarLabel";
import { usePathname, useRouter } from "next/navigation";
import { useQueryParams } from "@/lib/helpers/hooks/useQueryParams";

const StocksFilter = ({ stocks }: { stocks: Stocks }) => {
	const pathname = usePathname();
	const updateSearchQuery = useQueryParams();
	const router = useRouter();

	const handleChangeStock = (value: string) => {
		const url =
			value === "all"
				? updateSearchQuery.updateQueryParams({ stock: "" })
				: value === "full"
				? updateSearchQuery.updateQueryParams({ stock: "full" })
				: updateSearchQuery.updateQueryParams({ stock: "none" });

		router.replace(decodeURIComponent(`${pathname}?${url.toString()}`));
	};

	return (
		<div className="space-y-3">
			<h5>Készlet</h5>
			<RadioGroup className="space-y-1" onValueChange={handleChangeStock}>
				<div className="flex items-center space-x-2">
					<RadioGroupItem className="w-5 h-5" value="all" id="all" />
					<FilterLabel htmlFor="all" productNumber={stocks.full + stocks.none}>
						Összes
					</FilterLabel>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem className="w-5 h-5" value="full" id="full" />
					<FilterLabel htmlFor="full" productNumber={stocks.full}>
						Készleten
					</FilterLabel>
				</div>
				<div className="flex items-center space-x-2 gap-0">
					<RadioGroupItem className="w-5 h-5" value="none" id="none" />
					<FilterLabel htmlFor="none" productNumber={stocks.none}>
						Rendelhető
					</FilterLabel>
				</div>
			</RadioGroup>
		</div>
	);
};

export default StocksFilter;
