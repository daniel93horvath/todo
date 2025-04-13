import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React from "react";

interface FilterLabelProps extends React.ComponentPropsWithoutRef<typeof Label> {
	children: React.ReactNode;
	productNumber?: number;
}

export default function FilterLabel({ children, className, productNumber, ...props }: FilterLabelProps) {
	return (
		<Label
			className={cn(
				"block font-normal leading-5 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
				className
			)}
			{...props}
		>
			{children}
			{productNumber !== undefined && (
				<span className="ms-1 text-xs text-muted-foreground">({productNumber})</span>
			)}
		</Label>
	);
}
