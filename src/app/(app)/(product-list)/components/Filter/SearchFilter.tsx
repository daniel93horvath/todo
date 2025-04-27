"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { OpInput } from "@/components/ui/custom/input/opInput";
import { SearchIcon } from "lucide-react";
import { useDebounce } from "@/lib/helpers/hooks/useDebounce";
import { useEffect, useState } from "react";
import { updateUrlWithoutReloadPage } from "../../hook";
// import { updateUrlWithoutReloadPage } from "../../hook"; // Ezt távolítsd el

const SearchFilter = ({ categoryName }: { categoryName?: string }) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [searchValue, setSearchValue] = useState(searchParams.get("searchquery") || "");
	const debouncedSearchValue = useDebounce(searchValue, 500);

	const handleOnChange = (value: string) => {
		setSearchValue(value);
	};

	useEffect(() => {
		const newSearchParams = new URLSearchParams(searchParams.toString());

		if (!debouncedSearchValue) {
			newSearchParams.delete("searchquery");
		} else {
			newSearchParams.set("searchquery", debouncedSearchValue);
		}
		const newUrl = `${pathname}?${newSearchParams.toString()}`;
		updateUrlWithoutReloadPage(decodeURIComponent(newUrl));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearchValue, pathname, router]);

	// ha az külsőleg változik (pl. böngésző vissza/előre gomb)
	useEffect(() => {
		setSearchValue(searchParams.get("searchquery") || "");
	}, [searchParams]);

	return (
		<div className="space-y-3">
			<div className="text-sm mb-0">Keresés az alábbi kategóriában </div>
			{/* TODO: Ezt a részt dinamikussá kellene tenni */}
			<h5>{categoryName}</h5>

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
