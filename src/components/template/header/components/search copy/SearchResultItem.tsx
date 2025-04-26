"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CommandItem } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/helpers/number";

interface Props {
	image: string;
	name: string;
	url: string;
	price?: number;
	onClose: () => void;
}

export default function SearchResultItem({ image, name, url, price, onClose }: Props) {
	//);
	// const imageUrl = image.startsWith("/images/")
	// 	? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${image}`
	// 	: image;
	const router = useRouter();
	const handleSelect = () => {
		if (url) router.push(url);
		onClose();
	};
	//console.log(imageUrl);

	return (
		<CommandItem
			value={name}
			onSelect={handleSelect}
			className="flex items-center justify-between gap-3 px-2 py-1 data-[selected=true]:bg-accent/70"
		>
			<div className="flex items-center gap-3 max-w-lg">
				<Image
					src={image}
					alt={name}
					width={60}
					height={60}
					className="p-1 object-contain h-auto w-[60px] max-h-[60px]"
				/>
				<span className="line-clamp-1 break-all text-sm">{name}</span>
			</div>
			{typeof price === "number" && <Badge>{formatNumber(price)} Ft</Badge>}
			{/* {typeof price === "number" && <strong>{formatNumber(price)} Ft</strong>} */}
		</CommandItem>
	);
}
