import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDownIcon, User2Icon } from "lucide-react";

import React from "react";
import LoginContent from "./LoginContent";

const LoginPopover = () => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className="rounded-full border-0 font-bold">
					<User2Icon className="!w-5 !h-5 text-secondary bg-white rounded-full" />
					Bejelentkezés
					<ChevronDownIcon />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0 w-sm" sideOffset={10}>
				<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-background z-10"></div>{" "}
				<LoginContent />
			</PopoverContent>
		</Popover>
	);
};

export default LoginPopover;
