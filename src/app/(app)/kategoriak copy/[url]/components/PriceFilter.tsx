"use client";
import React, { useState, useEffect, useRef } from "react";
import { Prices } from "../schema";
import { formatNumber } from "@/lib/helpers/number";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OpInput } from "@/components/ui/custom/input/opInput";
import FilterLabel from "./FilterLabel";
import { useQueryParams } from "@/lib/helpers/hooks/useQueryParams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/lib/helpers/hooks/useDebounce";

const PriceFilter = ({ prices }: { prices: Prices }) => {
	const updateQueryParam = useQueryParams();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Kezdeti értékek beállítása az URL-ből
	const initialPriceRange = searchParams.get("price_range[]");
	const initialMinPrice = searchParams.get("min_price");
	const initialMaxPrice = searchParams.get("max_price");

	const [selectedRange, setSelectedRange] = useState<string | null>(initialPriceRange);
	const [displayMinPrice, setDisplayMinPrice] = useState<string>(
		initialMinPrice ? formatNumber(Number(initialMinPrice)) : ""
	);
	const [displayMaxPrice, setDisplayMaxPrice] = useState<string>(
		initialMaxPrice ? formatNumber(Number(initialMaxPrice)) : ""
	);

	const [minPrice, setMinPrice] = useState<string>(initialMinPrice || "");
	const [maxPrice, setMaxPrice] = useState<string>(initialMaxPrice || "");

	// Debounce értékek 500ms késleltetéssel
	const debouncedMinPrice = useDebounce<string>(minPrice, 500);
	const debouncedMaxPrice = useDebounce<string>(maxPrice, 500);

	// A komponens első renderelésének elkerülése érdekében
	const didMountMin = useRef(false);
	const didMountMax = useRef(false);

	// Csak számokat engedünk meg
	const sanitizeInput = (value: string) => value.replace(/[^0-9]/g, "");

	// Általános függvény a minimum és maximum érték kezelésére
	const handlePriceInputChange = (type: "min" | "max") => (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = sanitizeInput(e.target.value);

		if (value) setSelectedRange(null); // Ha bármelyik inputot használják, töröljük a kiválasztott range-et
		if (type === "min") {
			setDisplayMinPrice(value ? formatNumber(Number(value)) : "");
			setMinPrice(value);
		} else {
			setDisplayMaxPrice(value ? formatNumber(Number(value)) : "");
			setMaxPrice(value);
		}
	};

	// URL frissítése a debounced min értékkel
	useEffect(() => {
		if (!didMountMin.current) {
			didMountMin.current = true;
			return;
		}
		const updatedUrl = updateQueryParam.updateQueryParams({
			"price_range[]": "",
			min_price: debouncedMinPrice,
		});
		router.replace(decodeURI(`${pathname}?${updatedUrl.toString()}`));
		// eslint-disable-next-line
	}, [debouncedMinPrice]);

	// URL frissítése a debounced max értékkel
	useEffect(() => {
		if (!didMountMax.current) {
			didMountMax.current = true;
			return;
		}
		const updatedUrl = updateQueryParam.updateQueryParams({
			"price_range[]": "",
			max_price: debouncedMaxPrice,
		});
		router.replace(decodeURI(`${pathname}?${updatedUrl.toString()}`));
		// eslint-disable-next-line
	}, [debouncedMaxPrice]);

	// Radio gomb változás kezelése
	const handleRadioChange = (value: string) => {
		const updatedUrl = updateQueryParam.updateQueryParams({
			min_price: "",
			max_price: "",
			"price_range[]": value,
		});

		setSelectedRange(value);

		// Radio választásakor töröljük a beírt árértékeket
		setDisplayMinPrice("");
		setDisplayMaxPrice("");
		setMinPrice("");
		setMaxPrice("");

		router.replace(decodeURI(`${pathname}?${updatedUrl.toString()}`));
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
					onChange={handlePriceInputChange("min")}
				/>
				<OpInput
					label="Maximum ár"
					value={displayMaxPrice}
					onChange={handlePriceInputChange("max")}
				/>
			</div>
		</div>
	);
};

export default PriceFilter;
