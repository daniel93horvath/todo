"use client"; // Indicate this is a Client Component

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { useTransition, useCallback } from "react";

export interface PaginationProps {
	/** Optional current page number. If not provided, it will be read from the URL search params. */
	currentPage?: number;
	/** Total number of items to paginate. */
	totalItems: number;
	/** Number of items to display per page. */
	itemsPerPage: number;
	/** Whether to display the page number links and ellipsis. Defaults to false. */
	visiblePages?: boolean;
	/** Optional CSS class name for the main Pagination container. */
	className?: string;
	/** The URL query parameter name used for the page number. Defaults to "page". */
	pageQueryParam?: string;
}

// Define constants for ellipsis keys for better readability and stable keys
const ELLIPSIS_LEFT_KEY = "ellipsis-left";
const ELLIPSIS_RIGHT_KEY = "ellipsis-right";

/**
 * A custom pagination component for Next.js App Router applications.
 * It supports reading the current page from props or URL search parameters
 * and handles client-side navigation using `useRouter` and `useTransition`.
 */
const CustomPagination = ({
	currentPage: currentPageProp,
	totalItems,
	itemsPerPage,
	visiblePages = false,
	className = "",
	pageQueryParam = "page",
}: PaginationProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	// --- Current Page Determination ---
	const getCurrentPage = useCallback((): number => {
		if (currentPageProp !== undefined) {
			// Validate prop value
			return Math.max(1, Math.floor(currentPageProp));
		}
		const pageFromUrl = searchParams.get(pageQueryParam);
		const parsedPage = pageFromUrl ? parseInt(pageFromUrl, 10) : 1;
		// Return 1 if parsing fails, page is not a number, or page is less than 1
		return !isNaN(parsedPage) && parsedPage > 0 ? parsedPage : 1;
	}, [currentPageProp, searchParams, pageQueryParam]);

	const currentPage = getCurrentPage();

	// --- Pagination Calculations ---
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const hasNextPage = currentPage < totalPages;
	const hasPrevPage = currentPage > 1;

	// --- Helper Functions ---

	/** Creates a new query string, preserving existing params and updating the specified one. */
	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);
			return params.toString();
		},
		[searchParams]
	);

	/** Handles navigation to a new page. */
	const handleNavigation = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>, page: number | "prev" | "next") => {
			e.preventDefault(); // Prevent default link behavior

			let targetPage: number;

			if (page === "prev") {
				if (!hasPrevPage) return;
				targetPage = currentPage - 1;
			} else if (page === "next") {
				if (!hasNextPage) return;
				targetPage = currentPage + 1;
			} else {
				// Prevent navigation to the same page or invalid pages
				if (page === currentPage || page < 1 || page > totalPages) return;
				targetPage = page;
			}

			const newQueryString = createQueryString(pageQueryParam, targetPage.toString());
			const newUrl = decodeURIComponent(`${pathname}?${newQueryString}`);

			// Update URL using transition for smoother UX
			startTransition(() => {
				router.push(newUrl);
			});
		},
		[
			currentPage,
			hasPrevPage,
			hasNextPage,
			totalPages,
			createQueryString,
			pageQueryParam,
			pathname,
			router,
			startTransition,
		]
	);

	/** Calculates the array of page numbers and ellipsis markers to display. */
	const getVisiblePageNumbers = useCallback((): (number | string)[] => {
		const current = currentPage;
		const last = totalPages;
		const delta = 2; // How many pages to show on each side of the current page
		const range: (number | string)[] = [];

		// 1. Always include the first page
		range.push(1);

		// 2. Calculate the core range around the current page
		let rangeStart = Math.max(2, current - delta);
		let rangeEnd = Math.min(last - 1, current + delta);

		// 3. Adjust range for edge cases (near start/end) for better balance
		if (current - delta <= 2) {
			// Near the beginning
			rangeEnd = Math.min(last - 1, 1 + delta * 2);
			rangeStart = 2;
		}
		if (current + delta >= last - 1) {
			// Near the end
			rangeStart = Math.max(2, last - delta * 2 - 1);
			rangeEnd = last - 1;
		}

		// 4. Add left ellipsis if needed
		if (rangeStart > 2) {
			range.push(ELLIPSIS_LEFT_KEY);
		}

		// 5. Add the page numbers in the calculated range
		for (let i = rangeStart; i <= rangeEnd; i++) {
			if (i > 0) {
				// Ensure we don't add page 0 or negative
				range.push(i);
			}
		}

		// 6. Add right ellipsis if needed
		if (rangeEnd < last - 1) {
			range.push(ELLIPSIS_RIGHT_KEY);
		}

		// 7. Always add the last page, unless it's the same as the first page
		if (last > 1) {
			range.push(last);
		}

		return range;
	}, [currentPage, totalPages]);

	/** Generates the URL for a specific page number. */
	const getPageUrl = useCallback(
		(pageNum: number) => {
			return `${pathname}?${createQueryString(pageQueryParam, pageNum.toString())}`;
		},
		[pathname, createQueryString, pageQueryParam]
	);

	/** Generates the URL for the previous page. */
	const getPreviousPageUrl = useCallback(() => {
		return hasPrevPage ? getPageUrl(currentPage - 1) : "#";
	}, [hasPrevPage, currentPage, getPageUrl]);

	/** Generates the URL for the next page. */
	const getNextPageUrl = useCallback(() => {
		return hasNextPage ? getPageUrl(currentPage + 1) : "#";
	}, [hasNextPage, currentPage, getPageUrl]);

	// --- Render Logic ---

	// Don't render pagination if there's only one page or fewer
	if (totalPages <= 1) {
		return null;
	}

	const disabledClass = "pointer-events-none opacity-50";

	return (
		<Pagination className={className} aria-label="Pagination">
			<PaginationContent>
				{/* Previous Button */}
				<PaginationItem>
					<PaginationPrevious
						href={getPreviousPageUrl()}
						aria-disabled={!hasPrevPage || isPending}
						tabIndex={!hasPrevPage || isPending ? -1 : undefined} // Improve accessibility
						className={!hasPrevPage || isPending ? disabledClass : ""}
						onClick={(e) => handleNavigation(e, "prev")}
					/>
				</PaginationItem>

				{/* Page Numbers and Ellipsis */}
				{visiblePages &&
					getVisiblePageNumbers().map((pageNum) => {
						if (typeof pageNum === "string") {
							// Render Ellipsis
							return (
								<PaginationItem key={pageNum}>
									<PaginationEllipsis />
								</PaginationItem>
							);
						} else {
							// Render Page Link
							const isCurrent = pageNum === currentPage;
							return (
								<PaginationItem key={`page-${pageNum}`}>
									<PaginationLink
										href={getPageUrl(pageNum)}
										isActive={isCurrent}
										aria-current={isCurrent ? "page" : undefined}
										aria-disabled={isPending} // Indicate disabled state during transition
										tabIndex={isPending ? -1 : undefined}
										className={isPending ? disabledClass : ""}
										onClick={(e) => handleNavigation(e, pageNum)}
									>
										{pageNum}
									</PaginationLink>
								</PaginationItem>
							);
						}
					})}

				{/* Next Button */}
				<PaginationItem>
					<div className="flex items-center">
						<PaginationNext
							href={getNextPageUrl()}
							aria-disabled={!hasNextPage || isPending}
							tabIndex={!hasNextPage || isPending ? -1 : undefined} // Improve accessibility
							className={!hasNextPage || isPending ? disabledClass : ""}
							onClick={(e) => handleNavigation(e, "next")}
						/>
					</div>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default CustomPagination;
