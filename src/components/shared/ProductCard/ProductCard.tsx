import * as React from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/app/product/schema";
import { formatNumber } from "@/lib/helpers/number";
import ProductLabels from "./ProductLabels";
import ImageWithFallback from "@/components/ui/custom/image/ImageWithFallback";
import Link from "next/link";

function ProductCard({
	product,
	isHorizontalOnMobile = true,
}: {
	product: Product;
	isHorizontalOnMobile?: boolean;
}) {
	// Szerver oldali véletlenszerű leárazás generálás
	// Ez minden rendereléskor újra lefut, de szerver oldali komponenseknél ez nem probléma
	const hasDiscount = true;
	const originalPrice = hasDiscount ? Math.round(product.price * 1.4) : null;
	return (
		<Card
			className={`w-full py-0 ${
				isHorizontalOnMobile ? "sm:max-w-xs" : "max-w-xs"
			} overflow-hidden border rounded-sm shadow-none relative`}
		>
			<div className="flex flex-col absolute top-2 left-2 z-10 gap-2">
				<Link href={`/webaruhaz/${product.partner.brand_nev_slug}`}>
					<Badge
						variant="outline"
						className="text-xs bg-accent sm:max-w-50 truncate block hover:opacity-40"
					>
						{product.partner.nev}
					</Badge>
				</Link>
			</div>
			<CardContent
				className={`p-4 ${
					isHorizontalOnMobile ? "flex sm:flex-col" : "h-full"
				} justify-between gap-4`}
			>
				<div className="relative min-w-32 sm:w-full h-40">
					<ImageWithFallback
						src={product.image}
						alt={product.name}
						fill
						sizes="(max-width: 768px) 100vw, 50vw"
						className="object-contain object-center sm:object-top w-full h-full"
						priority={false}
					/>
				</div>

				<div>
					<div className="flex flex-col gap-2 mt-2 w-full">
						<CardTitle className="text-sm h-10 line-clamp-2 text-muted-foreground break-all overflow-wrap-anywhere">
							{product.name}
						</CardTitle>
						<div className="flex flex-wrap gap-2 sm:gap-3">
							<ProductLabels product={product} />
						</div>

						<div className="flex flex-wrap items-center space-x-2">
							<p className="text-lg font-extrabold text-secondary">
								{formatNumber(product.price)} Ft
							</p>
							{hasDiscount && (
								<p className="text-sm line-through text-muted-foreground">
									{originalPrice !== null && `${formatNumber(originalPrice)} Ft`}
								</p>
							)}
						</div>
						<Button className="w-full">
							<ShoppingCart />
							Kosárba
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
export default React.memo(ProductCard);
