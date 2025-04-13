import React from "react";
import { Stocks } from "../schema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FilterLabel from "./FilterLabel";

const StocksFilter = ({ stocks }: { stocks: Stocks }) => {
	return (
		<div className="space-y-3">
			<h5>Készlet</h5>
			<RadioGroup className="space-y-1">
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
