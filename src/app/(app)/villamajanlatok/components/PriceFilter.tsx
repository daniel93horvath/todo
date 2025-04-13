"use client";
import React, { useState } from "react";
import { Prices } from "../schema";
import { formatNumber } from "@/lib/helpers/number";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OpInput } from "@/components/ui/custom/input/opInput";
import FilterLabel from "./FilterLabel";

const PriceFilter = ({
	prices,
	onChange,
}: {
	prices: Prices;
	onChange?: (values: { min?: number; max?: number; range?: string }) => void;
}) => {
	const [selectedRange, setSelectedRange] = useState<string | null>(null);
	const [minPrice, setMinPrice] = useState<string>("");
	const [maxPrice, setMaxPrice] = useState<string>("");
	const [displayMinPrice, setDisplayMinPrice] = useState<string>("");
	const [displayMaxPrice, setDisplayMaxPrice] = useState<string>("");

	// Segédfüggvény a számok kezeléséhez
	const handleNumberInput = (value: string) => {
		// Csak számokat és üres stringet engedünk meg
		const onlyNumbers = value.replace(/[^0-9]/g, "");
		return onlyNumbers;
	};

	// Min ár változás kezelése
	const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = handleNumberInput(e.target.value);
		setMinPrice(value);

		if (value) {
			setDisplayMinPrice(formatNumber(Number(value)));
			// Ha bármelyik input mezőt használják, töröljük a kiválasztott range-et
			setSelectedRange(null);
		} else {
			setDisplayMinPrice("");
		}

		if (onChange) {
			onChange({
				min: value ? Number(value) : undefined,
				max: maxPrice ? Number(maxPrice) : undefined,
				range: undefined,
			});
		}
	};

	// Max ár változás kezelése
	const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = handleNumberInput(e.target.value);
		setMaxPrice(value);

		if (value) {
			setDisplayMaxPrice(formatNumber(Number(value)));
			// Ha bármelyik input mezőt használják, töröljük a kiválasztott range-et
			setSelectedRange(null);
		} else {
			setDisplayMaxPrice("");
		}

		if (onChange) {
			onChange({
				min: minPrice ? Number(minPrice) : undefined,
				max: value ? Number(value) : undefined,
				range: undefined,
			});
		}
	};

	// Radio változás kezelése
	const handleRadioChange = (value: string) => {
		setSelectedRange(value);
		// Radio választásakor töröljük a beírt minimum és maximum értékeket
		setMinPrice("");
		setMaxPrice("");
		setDisplayMinPrice("");
		setDisplayMaxPrice("");

		if (onChange) {
			onChange({ min: undefined, max: undefined, range: value });
		}
	};

	return (
		<div className="space-y-3">
			<h5>Ár</h5>
			<RadioGroup
				className="space-y-1"
				value={selectedRange || ""}
				onValueChange={handleRadioChange}
			>
				{prices.ranges.map((priceRange, index: number) => (
					<div key={index} className="flex items-center space-x-2">
						<RadioGroupItem
							className="w-5 h-5"
							value={`${priceRange.min}-${priceRange.max}`}
							id={`${priceRange.min}-${priceRange.max}`}
						/>
						<FilterLabel
							htmlFor={`${priceRange.min}-${priceRange.max}`}
							productNumber={priceRange.total}
						>
							{formatNumber(priceRange.min)} - {formatNumber(priceRange.max)}
						</FilterLabel>
					</div>
				))}
			</RadioGroup>

			<div className="flex gap-3 mt-5">
				<OpInput
					label="Minimum ár"
					value={displayMinPrice}
					onChange={handleMinChange}
					onClick={() => selectedRange && setSelectedRange(null)}
				/>
				<OpInput
					label="Maximum ár"
					value={displayMaxPrice}
					onChange={handleMaxChange}
					onClick={() => selectedRange && setSelectedRange(null)}
				/>
			</div>
		</div>
	);
};

export default PriceFilter;
