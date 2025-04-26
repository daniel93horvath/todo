import React from "react";

interface LoadingSkeletonProps {
	/**
	 * Ahány skeleton elemet szeretnél kirajzoltatni.
	 * Alapértelmezett: 5
	 */
	count?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count = 6 }) => {
	return (
		<div className="p-2">
			{Array.from({ length: count }).map((_, idx) => (
				<div
					key={idx}
					className="flex items-center space-x-2 p-2 animate-pulse"
					role="status"
					aria-label="termék keresés betöltése"
				>
					{/* Kép helyőrző */}
					<div className="h-13 w-13 bg-gray-200 dark:bg-gray-700 rounded" />

					{/* Szöveg helyőrzők */}
					<div className="flex-1 space-y-1">
						<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
						<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6" />
					</div>
				</div>
			))}
		</div>
	);
};

export default LoadingSkeleton;
