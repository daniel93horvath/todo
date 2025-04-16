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

	const appendQueryParams = (newParams: Record<string, string | string[] | undefined>) => {
		const currentParams = new URLSearchParams(Array.from(searchParams.entries()));

		Object.keys(newParams).forEach((key) => {
			const value = newParams[key];
			if (value === undefined || value === "") return;
			if (Array.isArray(value)) {
				value.forEach((v) => currentParams.append(key, v));
			} else {
				currentParams.append(key, value);
			}
		});

		return currentParams;
	};

	/**
	 * Eltávolít egy adott értéket a megadott kulcs tömb típusú query paramétereiből.
	 *
	 * Példa:
	 * URL: http://localhost:3000/kategoriak/hutok-es-fagyasztok?category[]=hutogep-alkatresztartozek&category[]=kombinalt-hutok
	 * removeQueryParamItem("category[]", "hutogep-alkatresztartozek")
	 * eredményként a category tömbből csak a "kombinalt-hutok" marad.
	 */
	const removeQueryParamItem = (key: string, deleteValue: string) => {
		const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
		const values = currentParams.getAll(key);
		if (values.length === 0) {
			return currentParams;
		}
		currentParams.delete(key);
		values.filter((val) => val !== deleteValue).forEach((val) => currentParams.append(key, val));
		return currentParams;
	};

	return {
		getQueryParams,
		updateQueryParams,
		appendQueryParams,
		removeQueryParamItem,
		searchParams,
	};
}
