import PartnerBox from "@/components/shared/PartnerBox/PartnerBox";
import { Partner } from "@/lib/Schema/Partner";
import React from "react";
import { Reviews } from "./Reviews";
import { PartnerReview } from "@/lib/Schema/PartnerReview";

const PartnerSection = ({ partner, reviews }: { partner?: Partner; reviews: PartnerReview[] }) => {
	if (!partner) {
		return;
	}
	return (
		<div className="sm:flex">
			<div className="block max-w-full w-full sm:flex sm:justify-center min-w-xs sm:max-w-xs">
				<PartnerBox partner={partner} />
			</div>
			<div className="mt-6 sm:mt-0 px-0 sm:px-4 w-full overflow-hidden cursor-pointer select-none">
				<Reviews reviews={reviews} />
			</div>
		</div>
	);
};

export default PartnerSection;
