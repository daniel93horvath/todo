//import Link from "next/link";
//import DeleteAllTodos from "./DeleteAllTodos";
//import ChangeTheme from "./ChangeTheme";
import Image from "next/image";
import { PiggyBankIcon, UserCircleIcon } from "lucide-react";
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

const Header = async () => {
	const { data: categories = [] } = await fetchGet<Category[]>("/get-onlinepenztarca-categories", {
		baseUrl: "https://www.onlinepenztarca.hu",
		cacheOptions: { revalidate: 3600 },
	});
	return (
		<div>
			<header className="hidden md:block p-2 pb-0 bg-secondary">
				<nav className="flex flex-col max-w-[1800] mx-auto ">
					<div className="flex items-center justify-between gap-3 p-2">
						<Link href="/" title="Főoldal">
							<OpLogo colorVariant="light" size={210} />
						</Link>
						<SearchInput />
						{process.env.NEXT_PUBLIC_APP_USER_LOGGED === "true" ? (
							<UserProfilePopover />
						) : (
							<LoginPopover />
						)}

						<div className="flex items-center gap-2">
							<PiggyBankIcon className="text-white w-8 h-8" />
							<div className="flex-col text-white">
								<div className="text-xs text-center">Spórolás számláló</div>
								<div className="font-bold text-center">{formatNumber(1243092500)}</div>
							</div>
						</div>
					</div>

					<div className="text-secondary-foreground font-bold text-sm">
						<div className="flex gap-10 [&>a]:hover:text-primary items-center">
							<CategoryMenuDesktop initialCategories={categories} />
							<Link href="#">Villámajánlatok</Link>
							<Link href="#">onlineTombola</Link>
							<Link href="#">Információ</Link>
							<ChangeTheme />
						</div>
					</div>
				</nav>
			</header>

			{/* Mobil header */}
			<header className="block md:hidden p-2 pb-0 bg-secondary">
				<Link href="/" title="Főoldal">
					<OpLogo colorVariant="light" size={150} className="block mx-auto my-[0.5]" />
				</Link>
				<nav className="flex items-center justify-between w-full gap-3 p-2">
					<DropDownCategoryDrawer categories={categories} />
					<SearchInput />
					<UserCircleIcon className="text-accent w-8 h-8" />
				</nav>
			</header>
		</div>
	);
};

export default Header;
