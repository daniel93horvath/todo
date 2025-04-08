import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
const SearchInput = () => {
	return (
		<div className="w-full relative max-w-3xl block mx-auto">
			<Input
				type="text"
				className="bg-input-background rounded-full w-full h-10 p-2 pl-4 placeholder:font-semibold placeholder:text-sm focus-within:ring-2 focus-within:ring-ring 
			 focus-visible:ring-2 focus-visible:ring-ring"
				placeholder="Mire szeretnél keresni?"
				name="search"
			/>
			<div className="bg-primary absolute right-0 top-0 h-full rounded-r-full flex items-center justify-center w-12 cursor-pointer">
				<SearchIcon className="w-4 text-secondary" strokeWidth={3} />
			</div>
		</div>
	);
};

export default SearchInput;
