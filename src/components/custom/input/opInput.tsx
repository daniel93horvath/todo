import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MailIcon } from "lucide-react";

interface OpInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	type?: string;
	id?: string;
	className?: string;
	icon?: React.ElementType;
}

export function OpInput({
	label = "",
	type = "text",
	id = "",
	className = "",
	icon: Icon,
	...props
}: OpInputProps) {
	const inputLabelAndIconClasses = cn(
		"pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted-foreground transition-all duration-200 ease-in-out",
		// Üres a mező, a placeholder még látszódik:
		"peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm",
		// Fókusz vagy kitöltés esetén:
		"peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs", //peer-focus:text-blue-600
		// Kitöltött mező esetén:
		"peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs"
	);

	return (
		<div className="relative w-full">
			<Input
				id={id}
				placeholder=" "
				type={type}
				className={cn("op-input-element peer pt-5", className)}
				{...props}
			/>
			{!Icon !== false && type === "email" && (
				<MailIcon className={cn("right-3 w-4 h-4 opacity-50", inputLabelAndIconClasses)} />
			)}
			{Icon && <Icon className={cn("right-3 w-4 h-4 opacity-50", inputLabelAndIconClasses)} />}
			<label htmlFor={id} className={cn("left-3", inputLabelAndIconClasses)}>
				{label}
			</label>
		</div>
	);
}
