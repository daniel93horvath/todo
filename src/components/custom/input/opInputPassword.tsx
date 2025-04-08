"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export function OpInputPassword({ label = "", id = "", className = "", ...props }) {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

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
		<div className="relative w-full h-13">
			<Input
				id={id}
				placeholder=""
				type={showPassword ? "text" : "password"}
				className={cn("op-input-element focus-visible:ring-0 h-13 peer pt-5", className)}
				{...props}
			/>
			<div
				className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
				onClick={togglePasswordVisibility}
			>
				{showPassword ? (
					<EyeIcon className="w-4 h-4 opacity-50 hover:opacity-100" />
				) : (
					<EyeOffIcon className="w-4 h-4 opacity-50 hover:opacity-100" />
				)}
			</div>
			<label htmlFor={id} className={cn("left-3", inputLabelAndIconClasses)}>
				{label}
			</label>
		</div>
	);
}
