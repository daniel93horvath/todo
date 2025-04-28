import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ImageWithFallback from "@/components/ui/custom/image/ImageWithFallback";
import { Partner } from "@/lib/Schema/Partner";
import React from "react";
import PartnerStars from "./PartnerStars";

const PartnerBox = ({ partner }: { partner: Partner }) => {
	return (
		<Card className="shadow-none pt-0 gap-2 rounded-lg border">
			<CardHeader className="p-0 overflow-hidden rounded-t-lg">
				<ImageWithFallback
					alt={partner.brand_nev}
					src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${partner.brand_image}`}
					width={480}
					height={226}
					className="w-full h-auto object-cover"
				/>
			</CardHeader>
			<CardContent className="flex justify-between gap-3">
				<div>
					<h5 className="m-0 p-0">{partner.brand_nev}</h5>
					<p className="text-xs line-clamp-5 text-muted-foreground">{partner.leiras}</p>
				</div>
				<div className="font-extrabold text-sidebar-accent text-3xl text-center">
					<div>8.8</div>
					<PartnerStars rating={partner.korrekt_webaruhaz_ertek} />
				</div>
			</CardContent>
		</Card>
	);
};

export default PartnerBox;
