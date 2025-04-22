"use client";
import React, { useState, useEffect, useRef } from "react";
import { Prices } from "../schema";
import { formatNumber } from "@/lib/helpers/number";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OpInput } from "@/components/ui/custom/input/opInput";
import FilterLabel from "./FilterSidebarLabel";
import { useQueryParams } from "@/lib/helpers/hooks/useQueryParams";
import { usePathname, useSearchParams, useRouter } from "next/navigation"; // Import useRouter
import { useDebounce } from "@/lib/helpers/hooks/useDebounce";
import { updateUrlWithoutReloadPage } from "../hook";

const PriceFilter = ({ prices }: { prices: Prices }) => {
	const updateQueryParam = useQueryParams();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter(); // useRouter hook inicializálása

	// Kezdeti értékek beállítása az URL-ből
	const initialPriceRange = searchParams.get("price_range[]");
	const initialMinPrice = searchParams.get("min_price");
	const initialMaxPrice = searchParams.get("max_price");

	const [selectedRange, setSelectedRange] = useState<string | null>(initialPriceRange);
	const [minPrice, setMinPrice] = useState<string>(initialMinPrice || "");
	const [maxPrice, setMaxPrice] = useState<string>(initialMaxPrice || "");

	const debouncedMinPrice = useDebounce<string>(minPrice, 500);
	const debouncedMaxPrice = useDebounce<string>(maxPrice, 500);

	// Ref annak követésére, hogy ez az első renderelés-e
	const isInitialMount = useRef(true);

	// Csak számokat engedünk meg
	const sanitizeInput = (value: string) => value.replace(/[^0-9]/g, "");

	// Általános függvény a minimum és maximum érték kezelésére
	const handlePriceInputChange = (type: "min" | "max") => (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = sanitizeInput(e.target.value);
		setSelectedRange(null); // Input használatakor töröljük a range kiválasztást

		if (type === "min") {
			setMinPrice(value);
		} else {
			setMaxPrice(value);
		}
	};

	// Egyesített useEffect a debounced min/max ár URL frissítésére
	useEffect(() => {
		// Ne fusson le az első rendereléskor
		if (isInitialMount.current) {
			isInitialMount.current = false;
			return;
		}

		// Csak akkor frissítsünk URL-t az input értékekkel, ha nincs range kiválasztva
		if (selectedRange === null) {
			const updatedUrl = updateQueryParam.updateQueryParams({
				"price_range[]": "", // Range törlése
				min_price: debouncedMinPrice || "", // Üres string, ha nincs érték
				max_price: debouncedMaxPrice || "", // Üres string, ha nincs érték
			});
			updateUrlWithoutReloadPage(`${pathname}?${updatedUrl.toString()}`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedMinPrice, debouncedMaxPrice, pathname, router, selectedRange]); // Függőség: debounced értékek és selectedRange

	// Radio gomb változás kezelése
	const handleRadioChange = (value: string) => {
		// Ha ugyanazt választja ki, töröljük a kiválasztást
		const newSelectedRange = selectedRange === value ? null : value;
		setSelectedRange(newSelectedRange);

		// Radio választásakor töröljük a beírt árértékeket
		setMinPrice("");
		setMaxPrice("");

		const updatedUrl = updateQueryParam.updateQueryParams({
			min_price: "", // Min/max törlése
			max_price: "",
			"price_range[]": newSelectedRange || "", // Új range vagy üres string
		});
		updateUrlWithoutReloadPage(`${pathname}?${updatedUrl.toString()}`);
	};

	// Formázott értékek kiszámítása a megjelenítéshez
	const displayMinPrice = minPrice ? formatNumber(Number(minPrice)) : "";
	const displayMaxPrice = maxPrice ? formatNumber(Number(maxPrice)) : "";

	return (
		<div className="space-y-3">
			<h5>Ár</h5>
			<RadioGroup
				className="space-y-1 "
				value={selectedRange || ""}
				onValueChange={handleRadioChange}
			>
				{prices.ranges.map((priceRange, index: number) => (
					<div key={index} className="flex items-center space-x-2">
						<RadioGroupItem
							className="w-5 h-5"
							value={`${priceRange.min}-${priceRange.max}`}
							id={`price-range-${priceRange.min}-${priceRange.max}`} // Egyedi ID
						/>
						<FilterLabel
							htmlFor={`price-range-${priceRange.min}-${priceRange.max}`} // ID-hoz illeszkedő htmlFor
							productNumber={priceRange.total}
						>
							{formatNumber(priceRange.min)} - {formatNumber(priceRange.max)}
						</FilterLabel>
					</div>
				))}
				<div key="all" className="flex items-center space-x-2">
					<RadioGroupItem className="w-5 h-5" value="" id="all" />
					<FilterLabel
						htmlFor="all" // ID-hoz illeszkedő htmlFor
						productNumber={prices.ranges.reduce((sum, range) => sum + range.total, 0)}
					>
						Összes
					</FilterLabel>
				</div>
			</RadioGroup>

			<div className="flex gap-3 mt-5">
				<OpInput
					label="Minimum ár"
					value={displayMinPrice} // Megjelenítéshez formázott érték
					onChange={handlePriceInputChange("min")}
				/>
				<OpInput
					label="Maximum ár"
					value={displayMaxPrice} // Megjelenítéshez formázott érték
					onChange={handlePriceInputChange("max")}
				/>
			</div>
		</div>
	);
};

export default PriceFilter;
