"use client";

import { OpInput } from "@/components/custom/input/opInput";
import { useDebounce } from "@/lib/helpers/hooks/useDebounce";
import { useQueryParams } from "@/lib/helpers/hooks/useQueryParams";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchUsers = () => {
	const router = useRouter();
	const queryParams = useQueryParams();
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	const handleSearch = (searchQuery: string) => {
		const updatedParams = queryParams.updateQueryParams({ page: "", name_like: searchQuery });
		router.replace(`/users?${updatedParams.toString()}`);
	};
	useEffect(() => {
		handleSearch(debouncedSearchTerm);
		// eslint-disable-next-line
	}, [debouncedSearchTerm]);

	return (
		<div className="my-8 max-w-sm">
			<OpInput
				label="Felhasználó név keresése"
				type="text"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
				icon={SearchIcon}
			/>
		</div>
	);
};

export default SearchUsers;
