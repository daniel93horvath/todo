"use client";
import { useRouter } from "next/navigation";
import { CommandItem } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/helpers/number";
import ImageWithFallback from "@/components/ui/custom/image/ImageWithFallback";

interface Props {
	image: string;
	name: string;
	url: string;
	price?: number;
	type: "product" | "category";
	total?: number;
	onClose: () => void;
}

export default function SearchResultItem({ type, image, name, url, price, total, onClose }: Props) {
	const router = useRouter();
	const handleSelect = () => {
		if (url) router.push(url);
		onClose();
	};

	return (
		<CommandItem
			value={name}
			onSelect={handleSelect}
			className="flex items-center justify-between gap-3 px-2 py-1 data-[selected=true]:rounded-sm data-[selected=true]:bg-accent/70"
		>
			<div className="flex items-center gap-3 max-w-lg">
				{type && (
					<ImageWithFallback
						src={image}
						alt={name}
						width={60}
						height={60}
						className="p-1 rounded-md object-contain w-[60px] h-[60px]"
					/>
				)}

				<span className="line-clamp-2 text-sm">
					{name} {total && <div className="text-muted-foreground text-xs">({total})</div>}
				</span>
			</div>
			{typeof price === "number" && <Badge>{formatNumber(price)} Ft</Badge>}
		</CommandItem>
	);
}
