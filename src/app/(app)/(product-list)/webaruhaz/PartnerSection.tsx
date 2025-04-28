import PartnerBox from "@/components/shared/PartnerBox/PartnerBox";
import { Partner } from "@/lib/Schema/Partner";
import React from "react";
import { Reviews } from "../schema";

const PartnerSection = ({ partner, reviews }: { partner?: Partner; reviews: Reviews[] }) => {
	if (!partner) {
		return;
	}
	console.log(reviews);
	return (
		<div className="min-w-xs max-w-xs">
			<PartnerBox partner={partner} />
		</div>
	);
};

export default PartnerSection;
