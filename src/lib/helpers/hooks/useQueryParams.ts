"use client";
import { useSearchParams } from "next/navigation";

export function useQueryParams() {
	const searchParams = useSearchParams();

	const getQueryParams = () => {
		const entries = Array.from(searchParams.entries());
		return entries.reduce((acc, [key, value]) => {
			if (acc[key]) {
				acc[key] = Array.isArray(acc[key])
					? [...(acc[key] as string[]), value]
					: [acc[key] as string, value];
			} else {
				acc[key] = value;
			}
			return acc;
		}, {} as Record<string, string | string[]>);
	};

	const updateQueryParams = (newParams: Record<string, string | string[] | undefined>) => {
		const currentParams = new URLSearchParams(Array.from(searchParams.entries()));

		Object.keys(newParams).forEach((key) => {
			const value = newParams[key];
			if (value === undefined || value === "") {
				currentParams.delete(key);
			} else if (Array.isArray(value)) {
				currentParams.delete(key);
				value.forEach((v) => currentParams.append(key, v));
			} else {
				currentParams.set(key, value);
			}
		});

		return currentParams;
	};

	return {
		getQueryParams,
		updateQueryParams,
		searchParams,
	};
}
