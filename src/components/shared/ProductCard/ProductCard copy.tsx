import * as React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/app/product/schema";
import { formatNumber } from "@/lib/helpers/number";
import ProductLabels from "./ProductLabels";
import ImageWithFallback from "@/components/ui/custom/image/ImageWithFallback";

function ProductCard({
	product,
	isHorizontalOnMobile = true,
}: {
	product: Product;
	isHorizontalOnMobile?: boolean;
}) {
	const hasDiscount = true; // Ezt valós adatból kellene meghatározni
	const originalPrice = hasDiscount ? Math.round(product.price * 1.4) : null;

	// Dinamikus osztályok a layouthoz
	// Mobilon horizontális (kép balra, tartalom jobbra), desktopon vertikális
	const contentLayoutClasses = isHorizontalOnMobile
		? "flex flex-row sm:flex-col gap-4 h-full"
		: "flex flex-col gap-4 h-full"; // Mindig vertikális
	const imageContainerClasses = isHorizontalOnMobile
		? "relative w-32 sm:w-full h-auto sm:h-40 flex-shrink-0" // Fix szélesség mobilon
		: "relative w-full h-40"; // Mindig teljes szélesség

	const badgeWithClasses = isHorizontalOnMobile
		? "max-w-35 truncate block" // Fix szélesség mobilon
		: ""; // Mindig teljes szélesség

	return (
		<Card
			className={`w-full overflow-hidden border rounded-sm shadow-none relative flex flex-col h-full py-4`}
		>
			{/* Partner Badge */}
			<Link
				href={`/webaruhaz/${product.partner.brand_nev_slug}`}
				className="absolute top-2 left-2 z-10"
				aria-label={`Ugrás ${product.partner.nev} áruházához`}
			>
				<Badge
					variant="outline"
					className={`text-xs bg-accent  hover:opacity-40 ${badgeWithClasses}`}
				>
					{product.partner.nev}
				</Badge>
			</Link>

			<CardContent className="p-4 flex flex-col flex-grow justify-between gap-4 py-0">
				<div className={contentLayoutClasses}>
					<div className={imageContainerClasses}>
						<ImageWithFallback
							src={product.image}
							alt={product.name}
							fill
							sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw" // Méretek finomhangolása szükséges lehet
							className="object-contain object-center"
							priority={false} // Állítsd true-ra, ha a "hajtás felett" van
						/>
					</div>

					{/* Részletek konténer */}
					<div className="flex flex-col gap-2 flex-grow">
						<CardTitle className="text-sm h-10 line-clamp-2 text-muted-foreground break-words font-medium">
							{product.name}
						</CardTitle>

						{/* Címkék */}
						<div className="flex flex-wrap gap-1">
							<ProductLabels product={product} />
						</div>

						{/* Ár */}
						<div className="flex flex-wrap items-baseline gap-x-2 mt-1">
							<p className="text-lg font-bold text-secondary">
								{formatNumber(product.price)} Ft
							</p>
							{originalPrice && (
								<p className="text-sm line-through text-muted-foreground">
									{formatNumber(originalPrice)} Ft
								</p>
							)}
						</div>
						<Button className="w-full mt-auto">
							<ShoppingCart className="mr-2 h-4 w-4" />
							Kosárba
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default ProductCard;
