// /hooks/useFetch.ts
import { useState, useEffect, useRef } from "react";
import { opFetch } from "@/lib/api/fetch";
import { StandardApiResponse, ErrorInfo, NextJSCacheOptions } from "@/lib/api/schema";

interface FetchOptions {
	method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
	data?: unknown;
	headers?: Record<string, string>;
	baseUrl?: string;
	cacheOptions?: NextJSCacheOptions;
	signal?: AbortSignal; // <-- opcionálisan továbbadható, ha kívülről jön
}

interface UseFetchOptions<T> {
	initialData?: T | null;
	manual?: boolean;
	dependencies?: unknown[];
	onSuccess?: (data: T) => void;
	onError?: (error: ErrorInfo) => void;
}

interface UseFetchResult<T> {
	data: T | null;
	loading: boolean;
	error: ErrorInfo | null;
	refetch: (overrideOptions?: FetchOptions) => Promise<StandardApiResponse<T> | null>;
	abort: () => void;
}

export function useFetch<T>(
	url: string | null,
	fetchOptions: FetchOptions = {},
	hookOptions: UseFetchOptions<T> = {}
): UseFetchResult<T> {
	const { initialData = null, manual = false, dependencies = [], onSuccess, onError } = hookOptions;

	const [data, setData] = useState<T | null>(initialData);
	const [loading, setLoading] = useState<boolean>(!manual && !!url);
	const [error, setError] = useState<ErrorInfo | null>(null);

	const abortControllerRef = useRef<AbortController | null>(null);

	/** A tényleges lekérő függvény – NEM memoizáljuk, React 19 már automatikusan stabilizál */
	async function fetchData(currentOptions: FetchOptions = {}): Promise<StandardApiResponse<T> | null> {
		if (!url) {
			setData(initialData);
			setLoading(false);
			setError(null);
			return null;
		}

		// Előző kérés megszakítása
		abortControllerRef.current?.abort();
		const controller = new AbortController();
		abortControllerRef.current = controller;

		setLoading(true);
		setError(null);

		// Alap + override összevonása
		const finalOptions = { ...fetchOptions, ...currentOptions };
		const { data: bodyData, baseUrl, cacheOptions, method = "GET", headers } = finalOptions;

		try {
			const response = await opFetch<T>(url, {
				method,
				data: bodyData,
				headers,
				baseUrl,
				cacheOptions,
				signal: controller.signal, // <-- ez jut el a native fetch-hez
			});

			if (controller.signal.aborted) return null; // már megszakították

			if (response.success && response.data !== undefined) {
				setData(response.data);
				setError(null);
				onSuccess?.(response.data);
			} else {
				const errInfo = response.error ?? {
					message: response.message || "Ismeretlen fetch hiba",
				};
				setError(errInfo);
				onError?.(errInfo);
			}
			return response;
		} catch (err) {
			if (err instanceof Error && err.name === "AbortError") return null;
			const errInfo: ErrorInfo = { message: err instanceof Error ? err.message : "Váratlan hiba" };
			setError(errInfo);
			onError?.(errInfo);
			return null;
		} finally {
			if (abortControllerRef.current === controller) {
				setLoading(false);
				abortControllerRef.current = null;
			}
		}
	}

	/* Automatikus futtatás mountkor / dependency-váltáskor */
	useEffect(() => {
		if (!manual && url) fetchData();
		return () => abortControllerRef.current?.abort();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [manual, url, ...dependencies]);

	/* Publikus segédfüggvények */
	function refetch(overrideOptions?: FetchOptions) {
		return fetchData(overrideOptions);
	}

	function abort() {
		abortControllerRef.current?.abort();
		setLoading(false);
	}

	return { data, loading, error, refetch, abort };
}
