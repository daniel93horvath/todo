"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { updateUrlWithoutReloadPage } from "../../hook";
import { OpInput } from "@/components/ui/custom/input/opInput";
import { SearchIcon } from "lucide-react";
import { useDebounce } from "@/lib/helpers/hooks/useDebounce";
import { useEffect, useMemo, useState } from "react";

const SearchFilter = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const urlQuery = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);

	const [searchValue, setSearchValue] = useState(urlQuery.get("searchquery") || "");
	const debouncedSearchValue = useDebounce(searchValue, 500); // 500 ms-es debounce

	const handleOnChange = (value: string) => {
		setSearchValue(value);
	};
	useEffect(() => {
		if (!debouncedSearchValue) {
			urlQuery.delete("searchquery");
		} else {
			urlQuery.set("searchquery", debouncedSearchValue);
		}
		updateUrlWithoutReloadPage(decodeURIComponent(`${pathname}?${urlQuery.toString()}`));
	}, [debouncedSearchValue, pathname, searchParams, urlQuery]);

	return (
		<div className="space-y-3">
			<div className="text-sm mb-0">Keresés az alábbi kategóriában </div>
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
