"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // shadcn/ui card komponensek
import { Badge } from "@/components/ui/badge"; // shadcn/ui badge
import { Button } from "@/components/ui/button"; // shadcn/ui button
import OpIcon from "@/components/branding/opIcon";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

type Product = {
	id: number;
	name: string;
	image: string;
	price: string;
};
export default function ProductCard({ product }: { product: Product }) {
	return (
		<Card className="w-full justify-between py-0 max-w-xs overflow-hidden border rounded-sm shadow-none gap-1">
			{/* Ha akarsz rajta "Kontaktor" vagy valamilyen címkét: */}

			<div className="absolute top-2 left-2 z-10">
				<Badge variant="secondary" className="text-xs">
					Kontaktor
				</Badge>
			</div>

			<CardHeader className="space-y-2 p-4">
				{/* Kép konténer: fix magassággal és object-cover-rel dolgozunk */}
				<div className="relative w-full h-45">
					<Image
						src={product.image}
						fill
						alt={product.name}
						className="object-cover w-full h-full"
					/>
				</div>
				<CardTitle className="text-sm text-muted-foreground leading-tight">
					{product.name}
				</CardTitle>
			</CardHeader>

			<CardContent className="p-4 pt-0 space-y-2">
				<div className="flex gap-3">
					<Badge className="bg-lime-500 text-white rounded-[4px] h-7 flex items-center">
						Készleten
					</Badge>
					<Badge className="bg-secondary text-accent rounded-[4px] h-7 flex items-center">
						<OpIcon className="mb-[0.8px]" />
						-1.500 Ft
					</Badge>
				</div>

				{/* Árkijelzés */}
				<div className="flex items-center space-x-2">
					<p className="text-lg font-extrabold text-secondary">{product.price}</p>
					<p className="text-sm line-through text-muted-foreground">123.450 Ft</p>
				</div>
				<Button className="w-full">
					<ShoppingCart />
					Részletek
				</Button>
			</CardContent>
		</Card>
	);
}
