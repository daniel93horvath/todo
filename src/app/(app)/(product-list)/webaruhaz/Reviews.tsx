import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import PartnerStars from "@/components/shared/PartnerBox/PartnerStars";
import { safeFormatDate } from "@/lib/helpers/date";
import { PartnerReview } from "@/lib/Schema/PartnerReview";

export function Reviews({ reviews }: { reviews: PartnerReview[] }) {
	const options = {
		skipSnaps: false,
		dragFree: true,
	};
	console.log(reviews);
	return (
		<Carousel className="w-full" opts={options}>
			<CarouselContent>
				{reviews.map((review, index) => (
					<CarouselItem key={index} className="max-w-xs">
						<Card className="h-45 shadow-none py-3">
							<CardHeader>
								<div className="flex w-full items-center justify-between">
									<div>
										<div className="line-clamp-1">
											{review.felhasznalo.adatok.kereszt_nev}
										</div>
										<div className="text-xs">
											{safeFormatDate(review.created_at, "yyyy-MM-dd")}
										</div>
									</div>
									<div className="bg-sidebar-accent w-fit px-3 py-1 rounded-sm flex items-center gap-1">
										<div className="text-card font-extrabold">9.5</div>
										<PartnerStars rating={9.6} className="text-card" />
									</div>
								</div>
							</CardHeader>
							<CardContent className="flex text-sm max-h-30 overflow-auto">
								{review.velemeny}
							</CardContent>
						</Card>
					</CarouselItem>
				))}
			</CarouselContent>
			<div className="flex justify-center gap-3 mt-7">
				<CarouselPrevious className="relative left-auto hover:scale-105 transition-transform rounded-md" />

				<CarouselNext className="relative left-1 hover:scale-105 transition-transform rounded-md" />
			</div>
		</Carousel>
	);
}
