import { OpInput } from "@/components/custom/input/opInput";
import { OpInputPassword } from "@/components/custom/input/opInputPassword";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowRightIcon, ChevronDownIcon, UserCircle2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginPopover = () => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className="rounded-full border-0 font-bold">
					<UserCircle2Icon />
					Bejelentkezés
					<ChevronDownIcon />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0 w-sm" sideOffset={10}>
				<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-background z-10"></div>{" "}
				<div className="p-3 space-y-4">
					<OpInput label="Email cím" />
					<div className="flex gap-2 items-center mb-2">
						<OpInputPassword label="Jelszó" />
						<Button className="w-12">
							<ArrowRightIcon />
						</Button>
					</div>
					<Link
						href="https://www.onlinepenztarca.hu/login/rememberpassword"
						className="text-sidebar-accent text-sm underline"
					>
						Elfelejtett jelszó
					</Link>
				</div>
				<div className="relative h-32 overflow-hidden flex items-center">
					<div className="absolute inset-0">
						<Image
							src="https://www.onlinepenztarca.hu/images/op-reg-foto.png?v=11"
							alt="Regisztráció háttér"
							fill
							objectFit="cover"
							priority={false}
						/>
					</div>
					<div className="ps-25">
						<span className="z-10 relative text-xs text-secondary">
							Új felhasználóként{" "}
							<span className="bg-primary font-extrabold rounded-xs">1.000 Ft-ot</span>{" "}
							teszünk új onlinePénztárcádba!
						</span>
						<div className="relative z-10 flex items-center mt-2">
							<Link href="https://www.onlinepenztarca.hu/uj-penztarca-regisztracio">
								<Button variant="secondary">Regisztráció</Button>
							</Link>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default LoginPopover;
