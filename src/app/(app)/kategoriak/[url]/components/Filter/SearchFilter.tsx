"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation"; // Import useRouter
// import { updateUrlWithoutReloadPage } from "../../hook"; // Ezt valószínűleg eltávolíthatod
import { OpInput } from "@/components/ui/custom/input/opInput";
import { SearchIcon } from "lucide-react";
import { useDebounce } from "@/lib/helpers/hooks/useDebounce";
import { useEffect, useState } from "react"; // Import useTransition
import { updateUrlWithoutReloadPage } from "../../hook";

const SearchFilter = () => {
	const router = useRouter(); // Get router instance
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Initialize state from current URL search params
	const [searchValue, setSearchValue] = useState(searchParams.get("searchquery") || "");
	const debouncedSearchValue = useDebounce(searchValue, 500); // 500 ms debounce

	const handleOnChange = (value: string) => {
		setSearchValue(value);
	};

	useEffect(() => {
		// Create new search params based on the *current* ones each time the effect runs
		const newSearchParams = new URLSearchParams(searchParams.toString());

		if (!debouncedSearchValue) {
			newSearchParams.delete("searchquery");
		} else {
			newSearchParams.set("searchquery", debouncedSearchValue);
		}

		// Reset to page 1 when the search query changes
		newSearchParams.delete("page");

		const newUrl = `${pathname}?${newSearchParams.toString()}`;

		// Update URL using router.replace for better integration with Next.js
		// Use transition for potentially smoother UX without hard navigation feel
		updateUrlWithoutReloadPage(decodeURIComponent(newUrl));

		// updateUrlWithoutReloadPage(decodeURIComponent(newUrl)); // Replace this with router.replace
	}, [debouncedSearchValue, pathname, searchParams, router]); // Include searchParams and router in dependencies

	return (
		<div className="space-y-3">
			<div className="text-sm mb-0">Keresés az alábbi kategóriában </div>
			{/* TODO: Ezt a részt dinamikussá kellene tenni */}
			<h5>Hűtők és fagyasztók</h5>

			<OpInput
				value={searchValue}
				onChange={(event) => handleOnChange(event.target.value)}
				label="Keresés a kategóriában"
				icon={SearchIcon}
			/>
		</div>
	);
};

export default SearchFilter;
