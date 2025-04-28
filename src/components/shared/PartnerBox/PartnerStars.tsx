import { StarIcon } from "lucide-react";
import React from "react";

/**
 * Csillagok komponens, amely 10-es skálán lévő értékelést jelenít meg 5 csillagos formában
 */
const PartnerStars = ({ rating, maxStars = 5 }: { rating: number; maxStars?: number }) => {
	// 10-es skálát átfordítjuk 0–5-re, majd 0,5-ös lépésekben kerekítjük
	const adjustedRating = Math.min(Math.max(Math.round((rating / 2) * 2) / 2, 0), maxStars);

	const fullStars = Math.floor(adjustedRating);
	const hasHalfStar = adjustedRating % 1 === 0.5;
	const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
	const starIconClasses = "text-sidebar-accent w-3 h-3";

	return (
		<div className="flex gap-1">
			{Array.from({ length: fullStars }).map((_, i) => (
				<StarIcon key={`full-${i}`} className={starIconClasses} fill="currentColor" />
			))}

			{hasHalfStar && (
				<div className="relative">
					<StarIcon className={starIconClasses} fill="transparent" />
					<div className="absolute top-0 left-0 overflow-hidden" style={{ width: "50%" }}>
						<StarIcon className={starIconClasses} fill="currentColor" />
					</div>
				</div>
			)}

			{Array.from({ length: emptyStars }).map((_, i) => (
				<StarIcon key={`empty-${i}`} className={starIconClasses} fill="transparent" />
			))}
		</div>
	);
};

export default PartnerStars;
