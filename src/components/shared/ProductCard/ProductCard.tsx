import * as React from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/app/product/schema";
import { formatNumber } from "@/lib/helpers/number";
import ProductLabels from "./ProductLabels";

export default function ProductCard({ product }: { product: Product }) {
	// Szerver oldali véletlenszerű leárazás generálás
	// Ez minden rendereléskor újra lefut, de szerver oldali komponenseknél ez nem probléma
	const hasDiscount = Math.random() < 0.4;
	const originalPrice = hasDiscount ? Math.round(product.price * 1.4) : null;

	return (
		<Card className="w-full py-0 sm:max-w-xs overflow-hidden border rounded-sm shadow-none relative">
			<div className="flex flex-col absolute top-2 left-2 z-10 gap-2">
				<Badge
					variant="outline"
					className="text-xs bg-accent sm:max-w-50 truncate block hover:opacity-40"
				>
					{product.partner.nev}
				</Badge>
			</div>
			<CardContent className="p-4 mt-3 sm:mt-0 flex sm:flex-col justify-between gap-4">
				<div className="relative min-w-32 sm:w-full h-40">
					<Image
						src={product.image}
						alt={product.name}
						fill
						sizes="(max-width: 768px) 100vw, 50vw"
						className="object-contain object-center mt-2 sm:mt-0 sm:object-top w-full h-full"
					/>
				</div>

				<div className="flex flex-col gap-2">
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
			</CardContent>
		</Card>
	);
}
