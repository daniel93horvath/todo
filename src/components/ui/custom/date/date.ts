import { DateRange } from "react-day-picker";

// Dátum konvertálás és validálás
export const parseDate = (date?: Date | string): Date | undefined => {
	if (!date) return undefined;

	// Ha már Date objektum, ellenőrizzük
	if (date instanceof Date) {
		return !isNaN(date.getTime()) ? date : undefined;
	}

	// String konvertálás
	try {
		const parsed = new Date(date);
		return !isNaN(parsed.getTime()) ? parsed : undefined;
	} catch {
		return undefined;
	}
};

// Dátum formázás YYYY-MM-DD formátumban
export const formatDate = (date?: Date): string => {
	if (!date) return "";
	return date.toISOString().split("T")[0];
};

// Zod séma típus konvertáló
export const dateToYYYYMMDD = (date?: Date | null): string | undefined => {
	if (!date) return undefined;

	// Időzóna-független formázás (lokális dátum használata)
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
};

export const parseYYYYMMDD = (value?: string | null): Date | undefined => {
	if (!value) return undefined;
	try {
		// YYYY-MM-DD formátumú string esetén time részek nélkül
		const [year, month, day] = value.split("-").map(Number);
		if (isNaN(year) || isNaN(month) || isNaN(day)) return undefined;

		const date = new Date(year, month - 1, day);
		return !isNaN(date.getTime()) ? date : undefined;
	} catch {
		return undefined;
	}
};

// Dátumtartomány kijelzéshez formázás
export const formatDateRange = (range?: DateRange): string => {
	if (!range || !range.from) return "";

	if (range.to) {
		if (range.from.toDateString() === range.to.toDateString()) {
			return formatDate(range.from);
		}
		return `${formatDate(range.from)} - ${formatDate(range.to)}`;
	}

	return formatDate(range.from);
};

export const dateRangeToString = (range?: DateRange | null): { from: string; to: string } | undefined => {
	if (!range) return undefined;

	return {
		from: range.from ? dateToYYYYMMDD(range.from) || "" : "",
		to: range.to ? dateToYYYYMMDD(range.to) || "" : "",
	};
};

export const stringToDateRange = (
	value?: { from?: string | null; to?: string | null } | null
): DateRange | undefined => {
	if (!value) return undefined;

	const from = parseYYYYMMDD(value.from);
	const to = parseYYYYMMDD(value.to);

	if (!from) return undefined;

	return {
		from,
		to: to || from,
	};
};
