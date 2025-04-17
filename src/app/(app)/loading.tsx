export default function Loading() {
	return (
		<div className="mx-auto w-full md:px-5">
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{[...Array(8)].map((_, i) => (
					<div key={i} className="animate-pulse bg-gray-200 rounded-lg h-[300px]" />
				))}
			</div>
		</div>
	);
}
