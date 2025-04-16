// utils/urlHelpers.js

/**
 * Eltávolít egy adott kulcsot az URLSearchParams-ból,
 * majd visszaadja az új lekérdezési stringet.
 *
 * @param searchParams - Az URLSearchParams objektum.
 * @param key - Az eltávolítandó kulcs.
 * @returns Az új lekérdezési string.
 * 
 const searchParams = useSearchParams();
 const updatedQuery = removeQueryParam(searchParams, 'editId');
router.replace(`/todos?${updatedQuery}`);
 */
export const removeQueryParam = (searchParams: URLSearchParams, key: string): string => {
	const newParams = new URLSearchParams(Array.from(searchParams.entries()));
	newParams.delete(key);
	return newParams.toString();
};

/**
 * ------------------------------------------------------------------------------------------------
 * Konvertál egy objektumot URLSearchParams objektummá, generikus típus támogatással.
 * Automatikusan kezeli a beágyazott objektumokat, tömböket és különböző típusú értékeket.
 *
 * Jellemzők:
 * - null, undefined és üres string értékeket figyelmen kívül hagyja
 * - Date objektumokat ISO formátumra konvertálja
 * - Tömböket ugyanazon kulccsal többször hozzáadja
 * - Beágyazott objektumokat "pontozott" jelöléssel laposít (pl. user.name=John)
 *
 * @template T - A konvertálandó objektum típusa
 * @param {T} params - Az objektum, amit URLSearchParams-szá kell konvertálni
 * @returns {URLSearchParams} URLSearchParams objektum
 *
 * @example
 * // Egyszerű objektum
 * createURLSearchParams({ search: 'term', page: 1 })
 * // => 'search=term&page=1'
 *
 * @example
 * // Beágyazott objektumok
 * createURLSearchParams({
 *   filters: {
 *     status: 'active',
 *     date: new Date('2023-01-01')
 *   }
 * })
 * // => 'filters.status=active&filters.date=2023-01-01T00:00:00.000Z'
 *
 * @example
 * // Tömbök kezelése
 * createURLSearchParams({ tags: ['react', 'typescript'] })
 * // => 'tags=react&tags=typescript'
 */

type PrimitiveValue = string | number | boolean | null | undefined;

interface RecordParam {
	// Rekurzív interfész az objektumokhoz
	[key: string]: ParamValue;
}

// Összesített típus
type ParamValue = PrimitiveValue | Date | PrimitiveValue[] | RecordParam;

export function createURLSearchParams<T extends Record<string, ParamValue>>(params: T): URLSearchParams {
	const searchParams = new URLSearchParams();

	// Rekurzív segédfüggvény a beágyazott objektumok kezeléséhez
	const processParam = (key: string, value: ParamValue): void => {
		if (value === undefined || value === null) {
			return;
		}

		if (value instanceof Date) {
			searchParams.append(key, value.toISOString());
		} else if (Array.isArray(value)) {
			value.forEach((item) => {
				if (item !== undefined && item !== null) {
					// Ha a kulcs már "[]" végződésű, nem adjuk hozzá újra
					const arrayKey = key.endsWith("[]") ? key : `${key}[]`;
					searchParams.append(arrayKey, String(item));
				}
			});
		} else if (typeof value === "object") {
			// Beágyazott objektumok kezelése - laposítjuk a struktúrát
			Object.entries(value).forEach(([nestedKey, nestedValue]) => {
				if (nestedValue !== undefined && nestedValue !== null) {
					processParam(`${key}.${nestedKey}`, nestedValue as ParamValue);
				}
			});
		} else if (value !== "") {
			searchParams.append(key, String(value));
		}
	};

	// Feldolgozzuk az összes paramétert
	Object.entries(params).forEach(([key, value]) => {
		processParam(key, value as ParamValue);
	});

	// Felülírjuk a toString metódust, hogy a "[]" karakterek ne legyenek kódolva
	const originalToString = searchParams.toString.bind(searchParams);
	searchParams.toString = () => originalToString().replace(/%5B/g, "[").replace(/%5D/g, "]");

	return searchParams;
}
