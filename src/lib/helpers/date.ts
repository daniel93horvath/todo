import { format as formatDateFn } from "date-fns";

/**
 * Formáz egy dátum stringet a megadott formátum szerint.
 *
 * Ez a függvény megpróbálja a megadott dateStr értéket Date objektummá
 * konvertálni, majd a date-fns segítségével a formatStr formátumban visszaadni.
 * Ha a dateStr érvénytelen vagy a formázás nem sikerül, a visszatérési érték "Hibás dátum".
 *
 * @param dateStr - A formázandó dátum string (pl. "2024-01-05T22:22:10").
 * @param formatStr - A date-fns által használt formátum string (pl. "yyyy-MM-dd h:i:s").
 * @returns A formázott dátum string, vagy "Hibás dátum" hiba esetén.
 */
export const safeFormatDate = (dateStr: string, formatStr: string): string => {
	try {
		const date = new Date(dateStr);
		return formatDateFn(date, formatStr);
	} catch (error) {
		console.warn("Dátum formázási hiba:", error);
		return "Hibás dátum";
	}
};
