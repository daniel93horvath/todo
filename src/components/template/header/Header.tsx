import { PiggyBankIcon } from "lucide-react";
import { formatNumber } from "@/lib/helpers/number";
import Link from "next/link";
import ChangeTheme from "./components/ChangeTheme";
import { fetchGet } from "@/lib/api/fetch";
import { CategoryMenuDesktop } from "./components/Categories/CategoryMenuDesktop";
import { Category } from "./components/Categories/schema";
import SearchInput from "./components/SearchInput";
import DropDownCategoryDrawer from "./components/Categories/mobile/DropDownCategoryDrawer";
import LoginPopover from "./components/LoginPopover";
import UserProfilePopover from "./components/Categories/UserProfilePopover";
import OpLogo from "@/components/branding/opLogo";
import LoginDrawer from "./components/Categories/mobile/LoginDrawer";
import { Button } from "@/components/ui/button";
import { ClientHeaderScrollFeature } from "./ClientHeaderScrollFeature";

const Header = async () => {
	const { data: categories = [] } = await fetchGet<Category[]>("/api/v3/categories", {
		baseUrl: "https://www.onlinepenztarca.hu",
		cacheOptions: { revalidate: 0 },
	});
	return (
		<ClientHeaderScrollFeature>
			<header className="hidden md:block p-2 pb-0 bg-secondary">
				<nav className="flex flex-col max-w-[1800] mx-auto ">
					<div className="flex items-center justify-between gap-3 p-2">
						<Link href="/" title="Főoldal">
							<OpLogo colorVariant="light" />
						</Link>
						<div className="w-3xl">
							<SearchInput />
						</div>
						<div className="flex gap-5">
							{process.env.NEXT_PUBLIC_APP_USER_LOGGED === "true" ? (
								<UserProfilePopover />
							) : (
								<LoginPopover />
							)}

							<div className="flex items-center gap-2">
								<PiggyBankIcon className="text-white w-8 h-8" />
								<div className="flex-col text-white">
									<div className="text-xs text-center">Spórolás számláló</div>
									<div className="font-bold text-center">
										{formatNumber(1243092500)}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="text-secondary-foreground font-bold text-sm">
						<div className="flex gap-10 [&>a]:hover:text-primary items-center">
							<CategoryMenuDesktop initialCategories={categories} />
							<Link href="/villamajanlatok">Villámajánlatok</Link>
							<Link href="#">onlineTombola</Link>
							<Link href="#">Információ</Link>
							<Link href="#">{new Date().toLocaleString("hu-HU")}</Link>
							<ChangeTheme />
						</div>
					</div>
				</nav>
			</header>

			{/* Mobil header */}
			<header className="block md:hidden p-2 pb-0 bg-secondary">
				<nav className="flex-col p-1 pb-2 space-y-2">
					<div className="flex items-center justify-between w-full gap-3">
						<DropDownCategoryDrawer categories={categories} />
						<Link href="/" title="Főoldal">
							<OpLogo colorVariant="light" size={150} className="block mx-auto my-[0.5]" />
						</Link>
						<LoginDrawer>
							<div className="p-2 mt-2 gap-3 flex overflow-auto">
								<Button variant="outline" asChild>
									<Link href="/villamajanlatok">Villámajánlatok</Link>
								</Button>
								<Button variant="outline" asChild>
									<Link href="https://www.onlinepenztarca.hu/mi-az-onlinepenztarca">
										Információ
									</Link>
								</Button>
								<Button variant="outline" asChild>
									<Link href="https://www.onlinepenztarca.hu/onlinetombola">
										onlineTombola
									</Link>
								</Button>
							</div>
						</LoginDrawer>
					</div>
					<SearchInput />
				</nav>
			</header>
		</ClientHeaderScrollFeature>
	);
};

export default Header;
