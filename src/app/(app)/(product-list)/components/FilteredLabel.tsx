"use client";
import { Filters } from "../schema";
import { Badge } from "@/components/ui/badge";
import { XCircleIcon } from "lucide-react";
import { useQueryParams } from "@/lib/helpers/hooks/useQueryParams";
import { usePathname } from "next/navigation";
import { updateUrlWithoutReloadPage } from "../hook";

const FilteredLabel = ({ filter }: { filter: Filters }) => {
	const useQuery = useQueryParams();
	const pathName = usePathname();
	const handleClick = () => {
		const urlItem = filter.url.split("="); //pl: category[]=hutok-es-fagyasztok
		const updatedUrl = useQuery.removeQueryParamItem(urlItem[0], urlItem[1]);
		updateUrlWithoutReloadPage(`${pathName}?${updatedUrl.toString()}`);
	};
	return (
		<Badge className="flex items-center h-fit">
			{filter.name}
			<div onClick={handleClick}>
				<XCircleIcon strokeWidth={1.5} className="!w-4 !h-4 cursor-pointer" />
			</div>
		</Badge>
	);
};

export default FilteredLabel;
