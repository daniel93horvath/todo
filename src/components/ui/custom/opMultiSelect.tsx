"use client";

import * as React from "react";
import { Check, ChevronDown, XCircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export type Option = {
	value: string;
	label: string;
};

interface MultiSelectProps {
	options: Option[];
	selected: string[];
	onChange: (selected: string[]) => void;
	placeholder?: string;
	emptyText?: string;
	className?: string;
	isError?: boolean;
	disabled?: boolean;
}

export function MultiSelect({
	options,
	selected,
	onChange,
	placeholder = "Válassz",
	emptyText = "Nincs találat",
	className,
	isError = false,
	disabled,
}: MultiSelectProps) {
	const [open, setOpen] = React.useState(false);
	function handleSelect(value: string) {
		const updatedSelected = selected.includes(value)
			? selected.filter((item) => item !== value)
			: [...selected, value];
		onChange(updatedSelected);
	}

	function handleRemove(e: React.MouseEvent, value: string) {
		e.stopPropagation(); // Megállítja az esemény buborékolását
		e.preventDefault(); // Megakadályozza az alapértelmezett viselkedést is
		onChange(selected.filter((item) => item !== value));
	}

	// Külön függvény csak a Badge komponensnek
	function renderBadge(value: string) {
		const option = options.find((option) => option.value === value);
		if (!option) return null;

		return (
			<Badge
				key={value}
				className="max-w-full flex items-center gap-1 pr-1"
				title={option.label} // Tooltip megjelenítése a teljes szöveghez
			>
				<span className="truncate max-w-[calc(100%-20px)]">{option.label}</span>
				<div
					onClick={(e) => handleRemove(e, value)}
					className="cursor-pointer hover:text-destructive ml-auto flex-shrink-0"
				>
					<XCircleIcon className="h-4 w-4" />
				</div>
			</Badge>
		);
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={cn(
						"w-full justify-between p-2 overflow-hidden",
						"op-input-element",
						selected.length > 1 ? "!h-auto" : "",
						isError ? "border-destructive border-1" : "",
						className
					)}
				>
					<div className="flex flex-wrap gap-1 w-full overflow-hidden">
						{selected.length > 0 ? (
							selected.map(renderBadge)
						) : (
							<span className="text-muted-foreground">{placeholder}</span>
						)}
					</div>
					<ChevronDown className="h-4 w-4 shrink-0 opacity-50 ml-2" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[var(--radix-popover-trigger-width)] min-w-[240px] p-0 m-2">
				<Command>
					<CommandInput placeholder="Keresés..." className="h-9" />
					<CommandList>
						<CommandEmpty>{emptyText}</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.value}
									value={option.value}
									disabled={disabled}
									onSelect={() => handleSelect(option.value)}
								>
									{option.label}
									<Check
										className={cn(
											"ml-auto h-4 w-4",
											selected.includes(option.value) ? "opacity-100" : "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
