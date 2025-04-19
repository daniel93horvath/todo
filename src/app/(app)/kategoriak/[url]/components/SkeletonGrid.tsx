"use client";
export default function SkeletonGrid() {
	return (
		<div className="grid h-fit sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-pulse">
			{Array.from({ length: 12 }).map((_, i) => (
				<div key={i} className="h-72 bg-muted rounded-lg" />
			))}
		</div>
	);
}
