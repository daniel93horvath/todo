import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ImageWithFallback from "@/components/ui/custom/image/ImageWithFallback";
import { Partner } from "@/lib/Schema/Partner";
import React from "react";
import PartnerStars from "./PartnerStars";

const PartnerBox = ({ partner }: { partner: Partner }) => {
	return (
		<Card className="shadow-none pt-0 gap-2 rounded-lg border h-fit">
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
					<h6 className="m-0 p-0">{partner.brand_nev}</h6>
					<p className="text-xs line-clamp-3 text-muted-foreground">{partner.leiras}</p>
				</div>
				<div className="text-center flex flex-col gap-1 h-fit">
					<div className="font-extrabold text-sidebar-accent text-2xl text-center flex flex-col gap-1">
						<div className="leading-6">8.8</div>
						<PartnerStars rating={partner.korrekt_webaruhaz_ertek} />
					</div>
					<div className="text-xs">{partner.korrekt_ertekeles_count} db</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default PartnerBox;
