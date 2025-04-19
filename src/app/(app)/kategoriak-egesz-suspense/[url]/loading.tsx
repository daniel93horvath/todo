export default function Loading() {
	return (
		<div className="grid md:grid-cols-[300px_1fr] gap-4">
			{/* Sidebar Skeleton */}
			<div className="hidden md:block animate-pulse bg-gray-200 rounded-lg h-[600px] dark:bg-gray-700" />

			{/* Product Grid Skeleton */}
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{[...Array(12)].map(
					(
						_,
						i // Kevesebb elem jobban nézhet ki a rácsban
					) => (
						<div
							key={i}
							className="animate-pulse bg-gray-200 rounded-lg h-[300px] dark:bg-gray-700"
						/>
					)
				)}
			</div>
		</div>
	);
}
