"use client";
import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, XCircleIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { parseDate, formatDateRange, dateRangeToString } from "@/components/ui/custom/date/date";
import { hu } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/helpers/hooks/useMediaQuery";

interface DateRangePickerProps {
	value?: DateRange | { from?: string | Date; to?: string | Date };
	onChange?: (range?: DateRange | { from: string; to: string }) => void;
	placeholder?: string;
	months?: number;
	disabled?: boolean | ((date: Date) => boolean);
	minDate?: Date | string;
	maxDate?: Date | string;
	className?: string;
	returnAsString?: boolean;
	isError?: boolean;
}

export const OPdateRangePicker: React.FC<DateRangePickerProps> = ({
	value,
	onChange,
	placeholder = "Válasszon dátumtartományt",
	months = 2,
	disabled,
	minDate,
	maxDate,
	className = "",
	returnAsString = false,
	isError = false,
}) => {
	// Állapot a popover nyitott/zárt állapotához
	const [open, setOpen] = useState(false);

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

		return value as DateRange;
	};

	const isMobile = useMediaQuery("(max-width: 768px)");

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

		// Ha kiválasztották a teljes tartományt, zárjuk be a popover-t
		if (newRange?.from && newRange?.to) {
			setTimeout(() => setOpen(false), 100);
		}
	};

	// Törlés kezelése
	const handleClear = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		onChange?.(returnAsString ? { from: "", to: "" } : undefined);
	};

	// Gomb feliratának meghatározása
	const buttonText = safeValue?.from ? formatDateRange(safeValue) : <span>{placeholder}</span>;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					type="button"
					variant="outline"
					className={cn(
						"h-13 justify-start text-left font-normal",
						"op-input-element",
						!safeValue?.from ? "text-muted-foreground" : "",
						isError && "border-destructive border-1",
						className
					)}
					aria-expanded={open}
				>
					<span className="truncate">{buttonText}</span>
					<div className="ml-auto flex gap-1 opacity-50">
						{(safeValue?.from || safeValue?.to) && (
							<span
								role="button"
								tabIndex={0}
								onClick={handleClear}
								onTouchEnd={(e) => {
									e.preventDefault();
									handleClear(e as unknown as React.MouseEvent);
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
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="range"
					selected={safeValue}
					onSelect={handleDateChange}
					initialFocus
					numberOfMonths={isMobile ? 1 : months}
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
