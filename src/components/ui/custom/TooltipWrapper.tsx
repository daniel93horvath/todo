import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type TooltipWrapperProps = {
	children: React.ReactNode;
	content?: React.ReactNode;
	disabled?: boolean;
};

export function TooltipWrapper({ children, content, disabled = false }: TooltipWrapperProps) {
	// Ha nincs tooltip tartalom vagy le van tiltva, csak a gyermeket adjuk vissza
	if (!content || disabled) {
		return <>{children}</>;
	}

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent className="shadow-md rounded-sm">{content}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
