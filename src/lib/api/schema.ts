// /lib/api/schema.ts
// Hiba információ típusa
export interface ErrorInfo {
	message: string;
	code?: string;
	details?: unknown;
}

// Cache beállítások típusdefiníciója
/*
cache opciók magyarázata:
"default" - alapértelmezett böngésző cache működés, HTTP fejlécek alapján dönt.
"force-cache" - aktívan próbál a cache-ből kiszolgálni, ha nincs találat, lekéri és elmenti.
"no-store" - teljesen kikapcsolja a cache-elést, mindig a szerverről kéri le az adatokat.
"no-cache" - feltételes kérést használ, mindig ellenőrzi a szervernél a frissítés szükségességét.
"only-if-cached" - kizárólag a cache-ből próbál kiszolgálni, csak same-origin kéréseknél működik.
"reload" - mindig új kérést indít a szerverhez, frissíti a cache-t az új válasszal.
*/
export type NextJSCacheOptions = {
	revalidate?: number | false; //Nextjs cache megoldása, kb ugyan az mint a cache:... ami a fetch függvény beállítása
	tags?: string[];
	cache?: "default" | "force-cache" | "no-store" | "no-cache" | "only-if-cached" | "reload";
};

// Alap API válasz típusa
/*export interface ApiResponse<T = unknown> {
	data: T;
}*/

// Generikus típusdefiníció a Laravel-szerű paginált válaszhoz
export interface LaravelPaginationMeta {
	current_page: number;
	total: number;
	per_page: number;
	// Itt még opcionális mezőket hozzá tudok adni, ami szükséges lehet!
}

// Egységes válaszformátum
export interface StandardApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
	error?: ErrorInfo;
	//meta?: LaravelPaginationMeta;
}
