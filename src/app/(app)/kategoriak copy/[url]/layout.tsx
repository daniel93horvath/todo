import React, { ReactNode } from "react";
import FilterSidebar from "./components/FilterSidebar";
import { fetchGet } from "@/lib/api/fetch";
import { Prices, Stocks, subCategoriesFromProducts } from "./schema";

const Layout = async ({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ url: string }>;
}) => {
	const urlParams = await params;

	console.log("children layout");

	const { data } = await fetchGet<{
		total: number;
		subCategoriesFromProducts: subCategoriesFromProducts[];
		prices: Prices;
		stocks: Stocks;
	}>(`/api/v3/categories/${urlParams.url}/products`, {
		baseUrl: "https://www.onlinepenztarca.hu",
		cacheOptions: { revalidate: 3600 },
	});
	// Alapértelmezett üres tömb, ha nincs data vagy products
	if (!data) {
		return <div className="mx-auto w-full md:px-5">Nincs terméktalálat</div>;
	}
	return (
		<div className="mx-auto w-full md:px-5">
			<h1>Villámajánlatok</h1>
			<div className="my-6">Rövid leírás a Villámajánlatokról!</div>

			<div className="grid md:grid-cols-[300px_1fr] gap-4">
				<FilterSidebar
					subCategories={data.subCategoriesFromProducts || []}
					prices={data.prices}
					stocks={data.stocks}
				/>

				{children}
			</div>
		</div>
	);
};

export default Layout;
