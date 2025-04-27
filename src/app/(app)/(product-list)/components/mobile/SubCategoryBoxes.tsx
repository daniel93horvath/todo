"use client";
import { Category } from "@/components/template/header/components/search/Schema";
import { Card } from "@/components/ui/card";
import ImageWithFallback from "@/components/ui/custom/image/ImageWithFallback";
import Link from "next/link";
import React from "react";
const SubCategoryBoxes = ({ subCategories = [] }: { subCategories?: Category[] }) => {
	return (
		<div className="md:hidden grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mb-10">
			{subCategories.map((category) => (
				<div key={category.url} className="h-full">
					<Card className="p-3 flex flex-col h-full shadow-none">
						<Link
							className="flex flex-wrap justify-center"
							href={`/kategoriak/${category.url}?teszt=1`}
						>
							<ImageWithFallback
								src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/images/categories/images/${category.image}`}
								alt={category.name}
								width={150}
								height={150}
								sizes="(max-width: 768px) 50vw, 33vw"
								className="object-contain"
							/>
							<p className="text-sm w-full line-clamp-2 text-primary-foreground text-center font-bold mt-3">
								{category.name}
							</p>
						</Link>
					</Card>
				</div>
			))}
		</div>
	);
};

export default SubCategoryBoxes;
