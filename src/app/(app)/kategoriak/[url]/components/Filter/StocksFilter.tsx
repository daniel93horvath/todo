"use client";
import { Stocks } from "../../schema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FilterLabel from "./FilterSidebarLabel";
import { usePathname, useSearchParams } from "next/navigation";
import { updateUrlWithoutReloadPage } from "../../hook";

const StocksFilter = ({ stocks }: { stocks: Stocks }) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentStock = searchParams.get("stock") || "all";

	const handleChangeStock = (value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		if (value === "all") {
			params.delete("stock");
		} else {
			params.set("stock", value);
		}
		updateUrlWithoutReloadPage(`${pathname}?${params.toString()}`);
	};

	return (
		<div className="space-y-3">
			<h5>Készlet</h5>
			<RadioGroup className="space-y-1" value={currentStock} onValueChange={handleChangeStock}>
				<div className="flex items-center space-x-2">
					<RadioGroupItem className="w-5 h-5" value="all" id="stock_all" />
					<FilterLabel htmlFor="stock_all" productNumber={stocks.full + stocks.none}>
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
