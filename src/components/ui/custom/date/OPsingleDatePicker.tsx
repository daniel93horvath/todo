import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"; // Új import a dialoghoz
import { CalendarIcon, XCircleIcon } from "lucide-react";
import { parseDate, formatDate, dateToYYYYMMDD } from "@/components/ui/custom/date/date";
import { hu } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/helpers/hooks/useMediaQuery";

interface SingleDatePickerProps {
	/**
	 * A kiválasztott dátum értéke, Date objektumként vagy YYYY-MM-DD formátumú stringként
	 */
	value?: Date | string;

	/**
	 * A dátum változásakor hívódó callback függvény
	 * @param date A kiválasztott új dátum (Date objektum vagy string a returnAsString értékétől függően)
	 */
	onChange?: (date?: Date | string) => void;

	/**
	 * A megjelenített placeholder szöveg, ha nincs dátum kiválasztva
	 * @default "Válasszon dátumot"
	 */
	placeholder?: string;

	/**
	 * A naptárban megjelenített hónapok száma
	 * @default 1
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
	 * Ha true, akkor a dátumválasztáskor a kiválasztott érték YYYY-MM-DD formátumú stringként kerül visszaadásra
	 * Hasznos URL paraméterek vagy API kérések esetén
	 * @default false
	 */
	returnAsString?: boolean;

	/**
	 * Ha true, akkor piros border-t kap
	 * @default false
	 */
	isError?: boolean;
}

export const OPsingleDatePicker: React.FC<SingleDatePickerProps> = ({
	value,
	onChange,
	placeholder = "Válasszon dátumot",
	months = 1,
	disabled,
	minDate,
	maxDate,
	className = "",
	isError = false,
	returnAsString = false, // alapértelmezetten nem konvertálunk. Ha true, akkor a dátumválasztás value stringként kerül tárolásra. PL submitnál az url-be. YYYY-MM-DD
}) => {
	// A value biztonságos konvertálása Date típusra
	const safeValue = parseDate(value);

	// Ellenőrzés, hogy mobilról (max-width: 768px) vagy asztali eszközről érkezik-e a kérés
	const isMobile = useMediaQuery("(max-width: 768px)");

	// Dátum változás kezelése
	const handleDateChange = (newDate?: Date) => {
		if (!onChange) return;

		const validDate = newDate && !isNaN(newDate.getTime()) ? newDate : undefined;

		if (returnAsString && validDate) {
			// Ha returnAsString=true, akkor stringként adjuk vissza
			onChange(dateToYYYYMMDD(validDate));
		} else {
			// Egyébként Date objektumként
			onChange(validDate);
		}
	};

	// Gomb feliratának meghatározása
	const buttonText = safeValue ? formatDate(safeValue) : <span>{placeholder}</span>;

	// Mobil esetén Dialog, asztali nézetben Popover
	if (isMobile) {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							"justify-start text-left font-normal",
							"op-input-element",
							!safeValue && "text-muted-foreground",
							isError && "border-destructive border-1",
							className
						)}
					>
						<span className="truncate">{buttonText}</span>
						<div className="ml-auto flex gap-1 opacity-50">
							{safeValue && (
								<span
									role="button"
									tabIndex={0}
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										onChange?.("");
									}}
									className="flex items-center justify-center rounded-full hover:text-destructive cursor-pointer"
									aria-label="Törlés"
								>
									<XCircleIcon className="h-5 w-5" />
								</span>
							)}
							<CalendarIcon className="h-4 w-4" />
						</div>
					</Button>
				</DialogTrigger>
				<DialogContent className="w-fit p-4">
					<DialogTitle className="max-w-11/12">{placeholder}</DialogTitle>
					<Calendar
						className="p-1"
						mode="single"
						selected={safeValue}
						onSelect={handleDateChange}
						initialFocus
						numberOfMonths={isMobile ? 1 : months} // Mobilon érdemes 1 hónapot megjeleníteni
						disabled={disabled}
						fromDate={parseDate(minDate)}
						toDate={parseDate(maxDate)}
						locale={hu}
						weekStartsOn={1}
					/>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={cn(
						"justify-start text-left font-normal",
						"op-input-element",
						!safeValue && "text-muted-foreground",
						isError && "border-destructive border-1",
						className
					)}
				>
					<span className="truncate">{buttonText}</span>
					<div className="ml-auto flex gap-1 opacity-50">
						{safeValue && (
							<span
								role="button"
								tabIndex={0}
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									onChange?.("");
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
					mode="single"
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
