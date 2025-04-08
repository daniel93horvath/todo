import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, XCircleIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { parseDate, formatDateRange, dateRangeToString } from "@/components/custom/date/date";
import { hu } from "date-fns/locale";
import { cn } from "@/lib/utils";

/**
 * Dátumtartomány-választó komponens tulajdonságai
 */
interface DateRangePickerProps {
	/**
	 * A kiválasztott dátumtartomány értéke
	 * Lehet DateRange típus vagy objektum from/to tulajdonságokkal (Date vagy YYYY-MM-DD string formátumban)
	 */
	value?: DateRange | { from?: string | Date; to?: string | Date };

	/**
	 * A dátumtartomány változásakor hívódó callback függvény
	 * @param range A kiválasztott új dátumtartomány (DateRange objektum vagy string páros a returnAsString értékétől függően)
	 */
	onChange?: (range?: DateRange | { from: string; to: string }) => void;

	/**
	 * A megjelenített placeholder szöveg, ha nincs dátumtartomány kiválasztva
	 * @default "Válasszon dátumtartományt"
	 */
	placeholder?: string;

	/**
	 * A naptárban megjelenített hónapok száma
	 * @default 2
	 */
	months?: number;

	/**
	 * Letiltja a teljes dátumválasztót vagy egyes dátumokat
	 * Boolean esetén a teljes komponenst, függvény esetén a megadott dátumokat tiltja le
	 */
	disabled?: boolean | ((date: Date) => boolean);

	/**
	 * Minimum választható dátum
	 * Date objektumként vagy YYYY-MM-DD formátumú stringként is megadható
	 */
	minDate?: Date | string;

	/**
	 * Maximum választható dátum
	 * Date objektumként vagy YYYY-MM-DD formátumú stringként is megadható
	 */
	maxDate?: Date | string;

	/**
	 * A komponenshez adott további CSS osztályok
	 */
	className?: string;

	/**
	 * Ha true, akkor a dátumválasztáskor a kiválasztott értékek YYYY-MM-DD formátumú stringként kerülnek visszaadásra
	 * Hasznos URL paraméterek vagy API kérések esetén
	 * @default false
	 */
	returnAsString?: boolean;

	/**
	 * Ha true, akkor hiba van és piros keretet kap
	 * @default false
	 */
	isError?: boolean;
}

/**
 * Dátumtartomány-választó komponens, amely egy gombra kattintva egy popoverben jeleníti meg a naptárat.
 * Támogatja mind a DateRange objektumként, mind a {from, to} struktúrájú objektumként való használatot,
 * ahol a dátumok lehetnek Date objektumok vagy YYYY-MM-DD formátumú stringek.
 *
 * @example
 * // Alap használat Date objektumokkal
 * <OPdateRangePicker
 *   value={selectedRange}
 *   onChange={(range) => setSelectedRange(range)}
 * />
 *
 * @example
 * // String formátumú dátumok használata URL paraméterekhez
 * <OPdateRangePicker
 *   value={{ from: fromParam, to: toParam }}
 *   onChange={(range) => {
 *     if (range && 'from' in range) {
 *       setFromParam(range.from);
 *       setToParam(range.to);
 *     }
 *   }}
 *   returnAsString={true}
 * />
 */

export const OPdateRangePicker: React.FC<DateRangePickerProps> = ({
	value,
	onChange,
	placeholder = "Válasszon dátumtartományt",
	months = 2,
	disabled,
	minDate,
	maxDate,
	className = "",
	returnAsString = false, // alapértelmezetten nem konvertálunk. Ha true, akkor a dátumválasztás value stringként kerül tárolásra. PL submitnál az url-be. YYYY-MM-DD
	isError = false,
}) => {
	// Dátumtartomány parseolása
	const parseDateRange = (value?: DateRangePickerProps["value"]): DateRange | undefined => {
		if (!value) return undefined;

		// Ha már objektum from-to tulajdonságokkal
		if (typeof value === "object" && "from" in value) {
			return {
				from: parseDate(value.from),
				to: parseDate(value.to),
			};
		}

		return undefined;
	};

	// A value biztonságos konvertálása DateRange típusra
	const safeValue = parseDateRange(value);

	// Dátum változás kezelése
	const handleDateChange = (newRange?: DateRange) => {
		if (!onChange) return;

		// Ha returnAsString=true, akkor stringként adjuk vissza
		if (returnAsString) {
			onChange(dateRangeToString(newRange));
		} else {
			onChange(newRange);
		}
	};

	// Gomb feliratának meghatározása
	const buttonText = safeValue?.from ? formatDateRange(safeValue) : <span>{placeholder}</span>;
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={cn(
						"h-13 justify-start text-left font-normal",
						"op-input-element",
						!safeValue?.from ? "text-muted-foreground" : "",
						isError && "border-destructive border-1",
						className
					)}
				>
					<span className="truncate">{buttonText}</span>
					<div className="ml-auto flex gap-1 opacity-50">
						{(safeValue?.from || safeValue?.to) && (
							<span
								role="button"
								tabIndex={0}
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									onChange?.({ from: "", to: "" });
								}}
								className="flex items-center justify-center rounded-full hover:text-destructive cursor-pointer"
								aria-label="Törlés"
							>
								<XCircleIcon className="h-4 w-4" />
							</span>
						)}
						<CalendarIcon className="h-4 w-4" />
					</div>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="range"
					selected={safeValue}
					onSelect={handleDateChange}
					initialFocus
					numberOfMonths={months}
					disabled={disabled}
					fromDate={parseDate(minDate)}
					toDate={parseDate(maxDate)}
					locale={hu}
					weekStartsOn={1}
				/>
			</PopoverContent>
		</Popover>
	);
};
