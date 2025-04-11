"use client";
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

export interface PaginationProps {
	currentPage: number;
	totalItems: number;
	itemsPerPage: number;
	visiblePages?: boolean;
	className?: string;
	pageQueryParam?: string; // Optional parameter name for the page query (default: "page")
}

const CustomPagination = ({
	currentPage,
	totalItems,
	itemsPerPage,
	visiblePages = false,
	className = "",
	pageQueryParam = "page",
}: PaginationProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Calculate pagination values internally
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const hasNextPage = currentPage < totalPages;
	const hasPrevPage = currentPage > 1;

	// Don't render pagination if there's only one page
	if (totalPages <= 1) {
		return null;
	}

	// Helper function to create query string
	const createQueryString = (name: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(name, value);
		return params.toString();
	};

	// Handle client-side navigation
	const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, page: number | string) => {
		e.preventDefault();

		let targetPage: number;
		if (page === "prev" && hasPrevPage) {
			targetPage = currentPage - 1;
		} else if (page === "next" && hasNextPage) {
			targetPage = currentPage + 1;
		} else if (typeof page === "number") {
			targetPage = page;
		} else {
			return; // Invalid navigation
		}

		// Update URL without page reload
		router.push(`${pathname}?${createQueryString(pageQueryParam, targetPage.toString())}`);
	};

	// Calculate which pages to show
	const getVisiblePageNumbers = () => {
		const current = currentPage;
		const last = totalPages;
		const delta = 2;
		const range = [];

		// Always include first page
		range.push(1);

		// Calculate start and end of range around current page
		let start = Math.max(2, current - delta);
		let end = Math.min(last - 1, current + delta);

		// If start is close to first page, compensate by extending the end
		if (start <= 3) {
			end = Math.min(last - 1, end + (3 - start));
			start = 2;
		}

		// If end is close to last page, compensate by extending the start
		if (end >= last - 2) {
			start = Math.max(2, start - (end - (last - 2)));
			end = last - 1;
		}

		// Add ellipsis or additional page numbers
		if (start > 2) {
			range.push(-1); // -1 represents ellipsis
		}

		// Add all pages in the calculated range
		for (let i = start; i <= end; i++) {
			range.push(i);
		}

		// Add ellipsis before last page if needed
		if (end < last - 1) {
			range.push(-2); // -2 represents ellipsis (using different key)
		}

		// Always add the last page if it's not the same as the first
		if (last !== 1) {
			range.push(last);
		}

		return range;
	};

	// Create SEO-friendly URLs for pagination
	const getPreviousPageUrl = () => {
		if (!hasPrevPage) return "#";
		const prevPage = currentPage - 1;
		return `${pathname}?${createQueryString(pageQueryParam, prevPage.toString())}`;
	};

	const getNextPageUrl = () => {
		if (!hasNextPage) return "#";
		const nextPage = currentPage + 1;
		return `${pathname}?${createQueryString(pageQueryParam, nextPage.toString())}`;
	};

	const getPageUrl = (pageNum: number) => {
		return `${pathname}?${createQueryString(pageQueryParam, pageNum.toString())}`;
	};

	return (
		<Pagination className={className}>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={getPreviousPageUrl()}
						aria-disabled={!hasPrevPage}
						className={!hasPrevPage ? "pointer-events-none opacity-50" : ""}
						onClick={(e) => hasPrevPage && handleNavigation(e, "prev")}
					/>
				</PaginationItem>

				{visiblePages &&
					getVisiblePageNumbers().map((pageNum, index) => {
						// Render ellipsis
						if (pageNum < 0) {
							return (
								<PaginationItem key={`ellipsis-${index}`}>
									<PaginationEllipsis />
								</PaginationItem>
							);
						}
						// Render page number
						return (
							<PaginationItem key={`page-${pageNum}`}>
								<PaginationLink
									href={getPageUrl(pageNum)}
									isActive={pageNum === currentPage}
									onClick={(e) => handleNavigation(e, pageNum)}
								>
									{pageNum}
								</PaginationLink>
							</PaginationItem>
						);
					})}

				<PaginationItem>
					<PaginationNext
						href={getNextPageUrl()}
						aria-disabled={!hasNextPage}
						className={!hasNextPage ? "pointer-events-none opacity-50" : ""}
						onClick={(e) => hasNextPage && handleNavigation(e, "next")}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default CustomPagination;
