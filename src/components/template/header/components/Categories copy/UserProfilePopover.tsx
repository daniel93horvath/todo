import OpIcon from "@/components/branding/opIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
	ChevronDownIcon,
	CircleUserRound,
	CreditCardIcon,
	LogOutIcon,
	NewspaperIcon,
	StarIcon,
	TicketsIcon,
	UserPlus2Icon,
	UserRoundIcon,
	WalletIcon,
} from "lucide-react";
import Link from "next/link";

const UserProfilePopover = () => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className="rounded-full border-0 font-bold w-45">
					<UserRoundIcon className="!w-5 !h-5 text-secondary bg-white rounded-full" />

					<span className="truncate">Dániel</span>
					<ChevronDownIcon />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				//className="text-secondary w-sm p-0 space-y-2 border-0 shadow-xl backdrop-blur-xl bg-gradient-to-b from-white  to-primary/20 dark:from-gray-900/95 dark:to-primary/20"
				className="w-sm p-0 space-y-2 border-0 shadow-xl text-primary-foreground"
				sideOffset={10}
			>
				<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-background z-10"></div>{" "}
				<div className="flex items-center text-secondary gap-2 p-3 m-0">
					<CircleUserRound className="w-7 h-7" />
					<p>
						Üdv, <span className="font-extrabold">Dániel</span>
					</p>
				</div>
				<div className="bg-secondary p-3 gap-4 flex items-center">
					<div className="bg-background rounded-md p-2">
						<OpIcon />
					</div>

					<div className="text-accent">
						<p className="text-sm">onlinePénztárcám tartalma</p>
						<p className="text-2xl font-extrabold">52.000 Ft</p>
					</div>
				</div>
				<div className="ps-3 py-3 space-y-2">
					<Link
						className="flex items-center gap-2"
						href="https://www.onlinepenztarca.hu/onlinepenztarcam"
					>
						<Button variant="ghost">
							<WalletIcon className="!w-6 !h-6" /> Pénztárcám
						</Button>
					</Link>
					<Link
						className="flex items-center gap-2"
						href="https://www.onlinepenztarca.hu/onlinepenztarcam#profilom-tranzakciok"
					>
						<Button variant="ghost">
							<CreditCardIcon className="!w-6 !h-6" /> Tranzakciók
						</Button>
					</Link>
					<Link
						className="flex items-center gap-2"
						href="https://www.onlinepenztarca.hu/profilom/korrekt-webaruhaz-ertekeles"
					>
						<Button variant="ghost">
							<StarIcon className="!w-6 !h-6" /> Értékelés
							<Badge
								variant="destructive"
								className="h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
							>
								3
							</Badge>
						</Button>
					</Link>
					<Link
						className="flex items-center gap-2"
						href="https://www.onlinepenztarca.hu/profilom/meghivas"
					>
						<Button variant="ghost">
							<UserPlus2Icon className="!w-6 !h-6" /> Meghívó
							<Badge
								variant="destructive"
								className="h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
							>
								1
							</Badge>
						</Button>
					</Link>
					<Link
						className="flex items-center gap-2"
						href="https://www.onlinepenztarca.hu/onlinetombola"
					>
						<Button variant="ghost">
							<TicketsIcon className="!w-6 !h-6" /> onlineTombola
							<Badge
								variant="destructive"
								className="h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
							>
								1
							</Badge>
						</Button>
					</Link>
					<Link className="flex items-center gap-2" href="https://www.onlinepenztarca.hu/story">
						<Button variant="ghost">
							<NewspaperIcon className="!w-6 !h-6" /> Blog
						</Button>
					</Link>
					<br />
					<Link
						className="flex items-center gap-2"
						href="https://www.onlinepenztarca.hu/logout"
					>
						<Button variant="ghost">
							<LogOutIcon className="!w-6 !h-6" /> Kijelentkezés
						</Button>
					</Link>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default UserProfilePopover;
