// /lib/api/fetch.ts
import { ErrorInfo, NextJSCacheOptions, LaravelPaginationMeta, StandardApiResponse } from "./schema";

/**
 * Közös fetch függvény, amit az összes metódus-specifikus függvény használ
 */

export async function opFetch<T>(
	url: string,
	{
		method = "GET",
		data = null,
		headers = {},
		baseUrl = "",
		cacheOptions = {},
	}: {
		method?: string;
		data?: unknown;
		headers?: Record<string, string>;
		baseUrl?: string;
		cacheOptions?: NextJSCacheOptions;
	} = {}
): Promise<StandardApiResponse<T>> {
	const options: RequestInit & { next?: { revalidate?: number | false; tags?: string[] } } = {
		method,
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...headers,
		},
	};
	// Cache beállítások hozzáadása
	if (Object.keys(cacheOptions).length > 0) {
		// Next.js specifikus cache opciók
		if (cacheOptions.revalidate !== undefined || cacheOptions.tags) {
			options.next = {
				...(cacheOptions.revalidate !== undefined && { revalidate: cacheOptions.revalidate }),
				...(cacheOptions.tags && { tags: cacheOptions.tags }),
			};
		}

		// Általános fetch cache opció
		if (cacheOptions.cache) {
			options.cache = cacheOptions.cache;
		}
	}

	if (data) {
		options.body = JSON.stringify(data);
	}

	try {
		const finalUrl = `${baseUrl}${url}`;
		const res = await fetch(finalUrl, options);
		const responseData = await res.json();

		if (!res.ok) {
			const serverMessage = responseData?.message || "Hiba történt a kérés során!";
			console.error(`API hiba (${res.status}):`, serverMessage);
			return {
				success: false,
				message: serverMessage,
				error: {
					message: serverMessage,
					code: String(res.status),
					details: responseData,
				},
			};
		}

		// Sikeres válasz esetén visszaadjuk az adatokat
		// és átvisszük a success és message mezőket ha léteznek
		return {
			success: responseData.success ?? true,
			message: responseData.message || "",
			data: responseData.data ?? responseData,
			...(responseData.meta ? { meta: responseData.meta } : {}),
		};
	} catch (error) {
		// Hálózati vagy egyéb hibák kezelése
		const errorMessage = error instanceof Error ? error.message : "Ismeretlen hiba történt";
		console.error("Hiba a kérés során:", errorMessage);
		const errorInfo: ErrorInfo = {
			message: errorMessage,
		};
		return {
			success: false,
			error: errorInfo,
			message: errorMessage,
		};
	}
}

/* GET kérésekhez használható fetch függvény */
export async function fetchGet<T>(
	url: string,
	{
		headers = {},
		baseUrl = "",
		cacheOptions = {},
	}: {
		headers?: Record<string, string>;
		baseUrl?: string;
		cacheOptions?: NextJSCacheOptions;
	} = {}
): Promise<StandardApiResponse<T>> {
	return opFetch<T>(url, {
		method: "GET",
		headers,
		baseUrl,
		cacheOptions,
	});
}

/* Lapozott GET kérésekhez használható fetch függvény */
export async function fetchGetPaginated<T>(
	url: string,
	{
		headers = {},
		baseUrl = "",
		cacheOptions = {},
	}: {
		headers?: Record<string, string>;
		baseUrl?: string;
		cacheOptions?: NextJSCacheOptions;
	} = {}
): Promise<StandardApiResponse<T> & { meta: LaravelPaginationMeta }> {
	return opFetch<T>(url, {
		method: "GET",
		headers,
		baseUrl,
		cacheOptions,
	}) as Promise<StandardApiResponse<T> & { meta: LaravelPaginationMeta }>;
}

/* POST kérésekhez használható fetch függvény */
export async function fetchPost<T>(
	url: string,
	data: unknown,
	{
		headers = {},
		baseUrl = "",
		cacheOptions = {},
	}: {
		headers?: Record<string, string>;
		baseUrl?: string;
		cacheOptions?: NextJSCacheOptions;
	} = {}
): Promise<StandardApiResponse<T>> {
	return opFetch<T>(url, {
		method: "POST",
		data,
		headers,
		baseUrl,
		cacheOptions,
	});
}

/* DELETE kérésekhez használható fetch függvény */
export async function fetchDelete<T>(
	url: string,
	{
		data = null,
		headers = {},
		baseUrl = "",
		cacheOptions = {},
	}: {
		data?: unknown;
		headers?: Record<string, string>;
		baseUrl?: string;
		cacheOptions?: NextJSCacheOptions;
	} = {}
): Promise<StandardApiResponse<T>> {
	return opFetch<T>(url, {
		method: "DELETE",
		data,
		headers,
		baseUrl,
		cacheOptions,
	});
}

/* PUT kérésekhez használható fetch függvény */
export async function fetchPut<T>(
	url: string,
	data: unknown,
	{
		headers = {},
		baseUrl = "",
		cacheOptions = {},
	}: {
		headers?: Record<string, string>;
		baseUrl?: string;
		cacheOptions?: NextJSCacheOptions;
	} = {}
): Promise<StandardApiResponse<T>> {
	return opFetch<T>(url, {
		method: "PUT",
		data,
		headers,
		baseUrl,
		cacheOptions,
	});
}
